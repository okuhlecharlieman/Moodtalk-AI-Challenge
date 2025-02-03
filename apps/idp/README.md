# idp

## Introduction

The IDP solution is based on Keycloak. 

Keycloak, an open-source identity and access management solution, is a practical choice for modern applications. Developed by Red Hat, it adheres to widely recognized standards like OAuth 2.0 and OpenID Connect, ensuring compatibility across various systems.

Keycloak simplifies user management and permissions through an easy-to-use administration console. It supports diverse authentication methods, including social logins and multi-factor authentication. The platform also facilitates integration with existing identity providers, streamlining user federation.

## Setup

By default, the IDP will be set up with the following users:

- Username: `admin@planner.ch`, Password `admin`

Before running the IDP, make sure to build the [Extensions](#Extensions).

## Realms

The default setup consists of three realms:
- Keycloak (used for the administration of keycloak itself)
- planner (used for public facing interfaces, planner.localhost)

## Extending the themes

The `login`-Theme and the `account`-Theme have been extended to match the Moodtalk Corporate Identity. 
The extended themes can be found in the directory `themes/moodtalk`.

## PostCSS in the build process

A postcss command has been added to purge unused classes from the CSS file of the login theme. 
Additionally, the build script creates a unique hash for the css file to prevent caching issues.

## Security

### General security considerations

The UI Apps use Proof Key for Code Exchange (https://datatracker.ietf.org/doc/html/rfc7636) to obtain tokens.
To guarantee data security, client configurations should always be as strict as possible.

This section details some of the most important settings that have to be set for new and existing applications

## Extensions

Keycloak can be extended by custom extensions. The sub-directory `extensions` contains all custom extensions.
All extensions can be built with maven by executing the following command from this directory:

```sh
mvn -B verify --file extensions/pom.xml
```

Please note that the build artifacts (JAR files) must be added to the directory `/opt/keycloak/providers/` in the keycloak docker container.
This is done automatically with docker-compose or the Dockerfile script.



 