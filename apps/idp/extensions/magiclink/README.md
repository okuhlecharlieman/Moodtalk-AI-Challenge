# Keycloak MagicLink Authenticator

## Preface
This extension is mostly copied from the magiclink extension found at https://github.com/dasniko/keycloak-extensions-demo.

Changes to the original include:

* Automatically set email to verified for users that sign in with a magiclink
* Require users to set a password after signing in with a magiclink

## About the extension

Authenticator which sends a magic link to the user with which the user can authenticate without needing to provide a password.

To provide a bit more security than just sending a link via e-mail, the authentication has to be finished where it was started.
So this has to happen in the same browser.
It's not possible to start the authentication on your phone and click the link in the mail on your desktop (or vice versa), this won't work.
(Or, if you want this get to work, you will have to implement another way, more complex!)
