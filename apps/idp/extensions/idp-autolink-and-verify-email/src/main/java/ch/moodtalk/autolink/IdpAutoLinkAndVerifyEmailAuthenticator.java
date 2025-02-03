package ch.moodtalk.autolink;

import org.jboss.logging.Logger;
import org.keycloak.authentication.AuthenticationFlowContext;
import org.keycloak.authentication.authenticators.broker.IdpAutoLinkAuthenticator;
import org.keycloak.authentication.authenticators.broker.util.SerializedBrokeredIdentityContext;
import org.keycloak.broker.provider.BrokeredIdentityContext;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.RealmModel;
import org.keycloak.models.UserModel;
import org.keycloak.sessions.AuthenticationSessionModel;

public class IdpAutoLinkAndVerifyEmailAuthenticator extends IdpAutoLinkAuthenticator {

  private static final Logger LOG = Logger.getLogger(IdpAutoLinkAndVerifyEmailAuthenticator.class);

  @Override
  protected void authenticateImpl(
    AuthenticationFlowContext context,
    SerializedBrokeredIdentityContext serializedCtx,
    BrokeredIdentityContext brokerContext
  ) {
    KeycloakSession session = context.getSession();
    RealmModel realm = context.getRealm();
    AuthenticationSessionModel authSession = context.getAuthenticationSession();

    UserModel existingUser = getExistingUser(session, realm, authSession);

    LOG.debugf(
      "User '%s' is set to authentication context when link with identity provider '%s' . Identity provider username is '%s' ",
      existingUser.getUsername(),
      brokerContext.getIdpConfig().getAlias(),
      brokerContext.getUsername()
    );

    // If the IDP is configured to trust the email address, we automatically set the user account to emailVerified=true to avoid a revalidation
    if (canSetEmailToVerified(existingUser, brokerContext)) {
      LOG.infof(
        "Email verified automatically after registration of user '%s' through Identity provider '%s' ",
        existingUser.getUsername(),
        brokerContext.getIdpConfig().getAlias()
      );
      existingUser.setEmailVerified(true);
    }

    context.setUser(existingUser);
    context.success();
  }

  protected boolean canSetEmailToVerified(UserModel existingUser, BrokeredIdentityContext brokerContext) {
    if (!brokerContext.getIdpConfig().isTrustEmail()) {
      return false;
    }

    if (brokerContext.getEmail() == null) {
      return false;
    }

    if (brokerContext.getEmail().isBlank()) {
      return false;
    }

    if (existingUser.getEmail() == null) {
      return false;
    }

    if (existingUser.getEmail().isBlank()) {
      return false;
    }

    return true;
  }
}
