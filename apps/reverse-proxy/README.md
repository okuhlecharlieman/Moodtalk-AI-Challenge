# reverse-proxy

## Introduction

The  Nginx reverse proxy acts as a middleman between users and the web applications.

## Setup

The Reverse Proxy listens to `.localhost`-Domains of the services. The following command can be used to add all
domains to the `/etc/hosts` config.

```sh
sudo sh -c 'cat << EOF >> /etc/hosts
127.0.0.1 app.planner.localhost
127.0.0.1 idp.planner.localhost
127.0.0.1 id.planner.localhost
127.0.0.1 api.planner.localhost
127.0.0.1 static.planner.localhost
127.0.0.1 mailhog.planner.localhost

::1 app.planner.localhost
::1 idp.planner.localhost
::1 id.planner.localhost
::1 api.planner.localhost
::1 static.planner.localhost
::1 mailhog.planner.localhost
EOF'
```

Once you have added the hosts config and started all services, you can access the different services with the following URLs:

- http://app.planner.localhost (UI App)
- http://api.planner.localhost (Svc API)
- http://id.planner.localhost (User Management Portal)
- http://idp.planner.localhost (IDP - Keycloak)
- http://static.planner.localhost (Static Files)
- http://mailhog.planner.localhost (Static Files)
