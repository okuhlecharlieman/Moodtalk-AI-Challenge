CREATE DATABASE IF NOT EXISTS `planner`;
GRANT ALL ON `planner`.* TO 'planner'@'%';

CREATE DATABASE IF NOT EXISTS `keycloak`;
GRANT ALL ON `keycloak`.* TO 'planner'@'%';

ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';
ALTER USER 'planner'@'%' IDENTIFIED WITH mysql_native_password BY 'password1234';
