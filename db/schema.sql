DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department(
    dept_id INT AUTO_INCREMENT,
    dept_name VARCHAR(40) NOT NULL,
    PRIMARY KEY (dept_id)
);

CREATE TABLE employee_role(
    role_id INT  AUTO_INCREMENT,
    title VARCHAR(45) NOT NULL,
    salary DEC(19,4) NOT NULL,
    dept_id INT,
    PRIMARY KEY (role_id),
    FOREIGN KEY (dept_id) REFERENCES department(dept_id)
);

CREATE TABLE employee(
    emp_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    emp_role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (emp_id),
    FOREIGN KEY (emp_role_id) REFERENCES employee_role(role_id),
    FOREIGN KEY (manager_id) REFERENCES employee(emp_id)
)