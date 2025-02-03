package ch.moodtalk.magiclink;

import java.util.HashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.jboss.logging.Logger;
import org.keycloak.authentication.AuthenticationFlowContext;
import org.keycloak.authentication.AuthenticationFlowError;
import org.keycloak.authentication.Authenticator;
import org.keycloak.common.util.KeycloakUriBuilder;
import org.keycloak.credential.CredentialProvider;
import org.keycloak.credential.PasswordCredentialProvider;
import org.keycloak.credential.PasswordCredentialProviderFactory;
import org.keycloak.email.EmailException;
import org.keycloak.email.EmailTemplateProvider;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.RealmModel;
import org.keycloak.models.UserModel;
import org.keycloak.models.utils.KeycloakModelUtils;

/**
 * Adapted by Marcel Lenz
 *
 * Changes to the original include:
 * - Automatically set email to verified for users that sign in with a magiclink
 * - Require users to set a password after signing in with a magiclink
 *
 * Original Author: Niko Köbler, https://www.n-k.de, @dasniko / https://github.com/dasniko/keycloak-extensions-demo/tree/main/magiclink
 */
@Slf4j
public class MagicLinkAuthenticator implements Authenticator {

  private static final Logger logger = Logger.getLogger(MagicLinkAuthenticator.class);

  private static final String SESSION_KEY = "magic-email-key";
  private static final String QUERY_PARAM = "magickey";
  private static final String MAGIC_LINK_TEMPLATE = "magic-link.ftl";

  @Override
  public void authenticate(AuthenticationFlowContext context) {
    String sessionKey = context.getAuthenticationSession().getAuthNote(SESSION_KEY);
    if (sessionKey != null) {
      String requestKey = context.getHttpRequest().getUri().getQueryParameters().getFirst(QUERY_PARAM);
      if (requestKey != null) {
        if (requestKey.equals(sessionKey)) {
          // as the user has to click the link in the email, we set the email address as verified
          logger.info("User Login successful " + context.getUser().getEmail());
          context.getUser().setEmailVerified(true);
          context.success();
        } else {
          logger.info("User Login failed for invalid sessionKey " + context.getUser().getEmail());
          context.failure(AuthenticationFlowError.INVALID_CREDENTIALS);
        }
      } else {
        displayMagicLinkSuccessPage(context);
      }
    } else {
      sendMagicLink(context);
    }
  }

  @Override
  public void action(AuthenticationFlowContext context) {}

  private void sendMagicLink(AuthenticationFlowContext context) {
    RealmModel realm = context.getRealm();
    UserModel user = context.getUser();
    if (user == null) {
      // if user is null, we don't want to allow for username guessing
      // so, we just say it's all ok and stop here
      displayMagicLinkSuccessPage(context);
      return;
    }

    String key = KeycloakModelUtils.generateId();
    context.getAuthenticationSession().setAuthNote(SESSION_KEY, key);

    EmailTemplateProvider emailTemplateProvider = context.getSession().getProvider(EmailTemplateProvider.class);
    emailTemplateProvider.setRealm(realm);
    emailTemplateProvider.setUser(user);

    String link = KeycloakUriBuilder
      .fromUri(context.getRefreshExecutionUrl())
      .queryParam(QUERY_PARAM, key)
      .build()
      .toString();
    // for further processing we need a mutable map here
    Map<String, Object> msgParams = new HashMap<>();
    msgParams.put("name", user.getUsername());
    msgParams.put("link", link);

    try {
      // Force set the update password action if the user does not have a password configured yet.
      setUpdatePasswordAction(context.getSession(), user);
      emailTemplateProvider.send("emailMagicLinkSubject", MAGIC_LINK_TEMPLATE, msgParams);
      displayMagicLinkSuccessPage(context);
    } catch (EmailException e) {
      log.error("Exception during sending email occurred.", e);
      context.failure(AuthenticationFlowError.INTERNAL_ERROR);
    }
  }

  private void displayMagicLinkSuccessPage(AuthenticationFlowContext context) {
    context.challenge(context.form().createForm("magic-link-success.ftl"));
  }

  /**
   * This function sets the required action UPDATE_PASSWORD if the user has not defined a password yet.
   *
   * This use case is usually triggered on the first login and makes sure, that the set password form is displayed for the user.
   */
  private void setUpdatePasswordAction(KeycloakSession session, UserModel user) {
    if (!user.credentialManager().isConfiguredFor(getCredentialProvider(session).getType())) {
      logger.info("Set required action " + UserModel.RequiredAction.UPDATE_PASSWORD + " for user " + user.getEmail());
      user.addRequiredAction(UserModel.RequiredAction.UPDATE_PASSWORD);
    }
  }

  @Override
  public boolean requiresUser() {
    return true;
  }

  /**
   * The authenticator can only be used if the UPDATE_PASSWORD required action is set for the user.
   * If the action is not set, the condition "user configured" will fail and the password-flow will be chosen.
   */
  @Override
  public boolean configuredFor(KeycloakSession session, RealmModel realm, UserModel user) {
    return !user.credentialManager().isConfiguredFor(getCredentialProvider(session).getType());
  }

  @Override
  public void setRequiredActions(KeycloakSession session, RealmModel realm, UserModel user) {}

  @Override
  public void close() {}

  public PasswordCredentialProvider getCredentialProvider(KeycloakSession session) {
    return (PasswordCredentialProvider) session.getProvider(
      CredentialProvider.class,
      PasswordCredentialProviderFactory.PROVIDER_ID
    );
  }
}
