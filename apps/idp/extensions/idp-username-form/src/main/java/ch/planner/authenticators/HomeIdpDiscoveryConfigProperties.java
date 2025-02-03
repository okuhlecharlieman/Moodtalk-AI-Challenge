package ch.planner.authenticators;

import static ch.planner.authenticators.HomeIdpDiscoveryConfig.*;
import static org.keycloak.provider.ProviderConfigProperty.BOOLEAN_TYPE;
import static org.keycloak.provider.ProviderConfigProperty.STRING_TYPE;

import java.util.List;
import org.keycloak.provider.ProviderConfigProperty;
import org.keycloak.provider.ProviderConfigurationBuilder;

/**
 * This is a fork from https://github.com/sventorben/keycloak-home-idp-discovery
 */
final class HomeIdpDiscoveryConfigProperties {

  private static final ProviderConfigProperty FORWARD_TO_LINKED_IDP_PROPERTY = new ProviderConfigProperty(
    FORWARD_TO_LINKED_IDP,
    "Forward to linked IdP",
    "Whether to forward existing user to a linked identity provider or not.",
    BOOLEAN_TYPE,
    false,
    false
  );

  private static final ProviderConfigProperty BYPASS_LOGIN_PAGE_PROPERTY = new ProviderConfigProperty(
    BYPASS_LOGIN_PAGE,
    "Bypass login page",
    "If OIDC login_hint parameter is present, whether to bypass the login page for managed domains or not.",
    BOOLEAN_TYPE,
    false,
    false
  );

  private static final ProviderConfigProperty FORWARD_TO_FIRST_MATCH_PROPERTY = new ProviderConfigProperty(
    FORWARD_TO_FIRST_MATCH,
    "Forward to first matched IdP",
    "When multiple IdPs match the domain, whether to forward to the first IdP found or let the user choose.",
    BOOLEAN_TYPE,
    true,
    false
  );

  private static final ProviderConfigProperty USER_ATTRIBUTE_PROPERTY = new ProviderConfigProperty(
    USER_ATTRIBUTE,
    "User attribute",
    "The user attribute used to lookup the email address of the user.",
    STRING_TYPE,
    "email",
    false
  );

  private static final ProviderConfigProperty FORWARD_UNVERIFIED_PROPERTY = new ProviderConfigProperty(
    FORWARD_UNVERIFIED_ATTRIBUTE,
    "Forward users with unverified email",
    "If 'User attribute' is set to 'email', whether to forward existing user if user's email is not verified.",
    BOOLEAN_TYPE,
    false,
    false
  );

  static final List<ProviderConfigProperty> CONFIG_PROPERTIES = ProviderConfigurationBuilder
    .create()
    .property(USER_ATTRIBUTE_PROPERTY)
    .property(FORWARD_UNVERIFIED_PROPERTY)
    .property(BYPASS_LOGIN_PAGE_PROPERTY)
    .property(FORWARD_TO_LINKED_IDP_PROPERTY)
    .property(FORWARD_TO_FIRST_MATCH_PROPERTY)
    .build();
}
