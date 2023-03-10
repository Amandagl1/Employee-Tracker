DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;

USE tracker_db;

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL, -- primary key
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL (10, 2) NOT NULL,
  department_id INT, 
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE CASCADE,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30),
  role_id INT, 
  FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE CASCADE,
  manager_id INT, 
  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
  ON DELETE SET NULL,
  PRIMARY KEY (id)
);


