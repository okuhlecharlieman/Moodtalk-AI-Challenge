package ch.planner.authenticators;

import jakarta.ws.rs.core.MultivaluedMap;
import java.util.List;
import org.jboss.logging.Logger;
import org.keycloak.authentication.AuthenticationFlowContext;
import org.keycloak.models.IdentityProviderModel;
import org.keycloak.models.UserModel;
import org.keycloak.services.managers.AuthenticationManager;

final class IdpUsernameFormAuthenticator extends HomeIdpDiscoveryAuthenticator {

  public static final String ALLOW_NON_SSO_LOGIN = "allow_non_sso_login";
  private static final Logger LOG = Logger.getLogger(IdpUsernameFormAuthenticator.class);
  public static final String ALLOW_NON_SSO_LOGIN_SUCCESS_STRING = "yes";

  IdpUsernameFormAuthenticator() {}

  @Override
  public void action(AuthenticationFlowContext authenticationFlowContext) {
    MultivaluedMap<String, String> formData = authenticationFlowContext.getHttpRequest().getDecodedFormParameters();
    if (formData.containsKey("cancel")) {
      LOG.debugf("Login canceled");
      authenticationFlowContext.cancelLogin();
      return;
    }

    String username = setUserInContext(
      authenticationFlowContext,
      formData.getFirst(AuthenticationManager.FORM_USERNAME)
    );
    if (username == null) {
      LOG.debugf("No username in request");
      return;
    }

    HomeIdpAuthenticationFlowContext context = new HomeIdpAuthenticationFlowContext(authenticationFlowContext);
    final List<IdentityProviderModel> homeIdps = context.discoverer().discoverForUser(username);

    // the validateUser functionality sets the user to the context
    boolean validatedUser = validateUser(authenticationFlowContext, formData);

    // check if the user is allowed to login without SSO. This is a custom field set on the user profile.
    Boolean allowNonSsoLogin = allowNonSsoLogin(authenticationFlowContext);

    if (Boolean.TRUE.equals(allowNonSsoLogin)) {
      LOG.infof("allow non-sso login for user %s", username);
    }

    if (homeIdps.isEmpty() || allowNonSsoLogin) {
      // If no IDP redirection is configured for the given email address or if the user is allowed to login without SSO, we forward the user to the next step (e.g. the password form or magiclink page)
      if (Boolean.TRUE.equals(validatedUser)) {
        // forward the user if the email has been found
        authenticationFlowContext.success();
      } else {
        // show an error page that the entered email is wrong. This allows for enumeration but an easy solution is not possible here
        // see https://github.com/keycloak/keycloak/issues/17629 for more details
        context.authenticationChallenge().forceChallenge();
      }
    } else {
      // redirect the user to the configured IDP
      RememberMe rememberMe = context.rememberMe();
      rememberMe.handleAction(formData);
      rememberMe.remember(username);
      redirectOrChallenge(context, username, homeIdps);
    }
  }

  /**
   * This method checks if a field is present on the user profile that allows a user to bypass the SSO redirection.
   */
  protected Boolean allowNonSsoLogin(AuthenticationFlowContext authenticationFlowContext) {
    UserModel user = authenticationFlowContext.getUser();

    if (user == null) {
      return false;
    }

    String allowNonSsoLoginAttributeValue = user.getFirstAttribute(ALLOW_NON_SSO_LOGIN);

    if (allowNonSsoLoginAttributeValue == null) {
      return false;
    }

    return allowNonSsoLoginAttributeValue.equals(ALLOW_NON_SSO_LOGIN_SUCCESS_STRING);
  }
}
