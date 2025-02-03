package ch.moodtalk.autolink;

import java.util.List;
import org.keycloak.Config;
import org.keycloak.authentication.Authenticator;
import org.keycloak.authentication.authenticators.broker.IdpAutoLinkAuthenticator;
import org.keycloak.authentication.authenticators.broker.IdpAutoLinkAuthenticatorFactory;
import org.keycloak.models.AuthenticationExecutionModel;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.KeycloakSessionFactory;
import org.keycloak.provider.ProviderConfigProperty;

public class IdpAutoLinkAndVerifyEmailAuthenticatorFactory extends IdpAutoLinkAuthenticatorFactory {

  public static final String PROVIDER_ID = "idp-auto-link-and-verify-email";
  static IdpAutoLinkAuthenticator SINGLETON = new IdpAutoLinkAndVerifyEmailAuthenticator();

  @Override
  public Authenticator create(KeycloakSession session) {
    return SINGLETON;
  }

  public void init(Config.Scope config) {}

  public void postInit(KeycloakSessionFactory factory) {}

  public void close() {}

  public String getId() {
    return PROVIDER_ID;
  }

  public String getReferenceCategory() {
    return "autoLink";
  }

  public boolean isConfigurable() {
    return false;
  }

  public AuthenticationExecutionModel.Requirement[] getRequirementChoices() {
    return REQUIREMENT_CHOICES;
  }

  @Override
  public String getDisplayType() {
    return "Automatically set existing user and update email verification";
  }

  @Override
  public String getHelpText() {
    return "Automatically set existing user to authentication context without any verification and verify email if IDP can be trusted";
  }

  public List<ProviderConfigProperty> getConfigProperties() {
    return null;
  }

  public boolean isUserSetupAllowed() {
    return false;
  }
}
