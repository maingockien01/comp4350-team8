CREATE DATABASE IF NOT EXISTS app;
CREATE DATABASE IF NOT EXISTS app_test;

CREATE USER 'app'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'app'@'%';
FLUSH PRIVILEGES;

CREATE USER 'app_test'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'app_test'@'%';
FLUSH PRIVILEGES;
