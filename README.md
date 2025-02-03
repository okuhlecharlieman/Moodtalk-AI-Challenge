# Hackathon Application

Welcome to the Hackathon Application.

This is a quick setup guide to set up the appliaction contained in this repository.

## Environment setup & Startup
1. Install a Java & Angular IDE, Intellij has a free ultimate licenses for students and teachers, and a 30 day test period. You can also use Visual Studio Code.
2. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/), if not already installed.
3. Clone the repository
4. Execute the [reverse proxy setup](./apps/reverse-proxy/README.md#setup)
5. Execute the [IDP setup](./apps/idp/README.md#setup)
6. run `docker-compose up -d` in the root directory of the repository
   1. You might need to run this command twice, as the IDP container might not be ready when the reverse proxy tries to connect to it.
7. Follow the instructions in the [UI App](./apps/ui/README.md#setup) to start the UI App
8. Follow the instructions in the [Service App](./apps/svc/README.md#setup) to start the Service App
9. Navigate to [http://app.planner.localhost](http://app.planner.localhost) to access the UI App
   1. Login data is 'admin@planner.ch' with password 'admin'

