insert into department (dept_name)
VALUES('Sales'),
      ('Legal'),
      ('Engineering'),
      ('Finance');

insert into employee_role (title, salary, dept_id) 
VALUES('Salesperson', 80000, 1),
      ('SW Engineer', 120000, 3),
      ('Legal Assistat', 65000,2),
      ('Intern SWE', 0, 3),
      ('Accountant', 85000, 4);

insert into employee (first_name, last_name, emp_role_id, manager_id)
VALUES('Ricardo', 'Menendez', 1, null),
      ('Ximena', 'De La Cruz', 2, null),
      ('Hector', 'De La Cruz SR', 2, 1),
      ('Hector', 'De La Cruz San', 3, null),
      ('David', 'De La Cruz San', 4, null);
