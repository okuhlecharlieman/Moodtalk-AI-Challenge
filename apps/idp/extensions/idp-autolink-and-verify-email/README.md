# Keycloak IDP autolink and verify email extension

This extension provides an authentication step that can be used as part of the first broker login flow.
If a user already exists when connecting through an IDP, the authenticator will automatically link the user to the existing account.

If the IDP is set to "Trust Email" the user attribute `emailVerified` will be set to `true` if the login is successful.