INSERT INTO department (name)
VALUES ('Product'),
       ('Research'),
       ('Admin'),
       ('Marketing'),
       ('Development');

INSERT INTO role (title, salary, department_id)
VALUES ('Engineer', 124000, 2),
       ('Architect', 130000, 3),
       ('Designer', 126000, 1),
       ('Analyst', 120000, 4),
       ('Tester', 112000, 5);
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Amanda', 'Lee', 2, null),
       ('Kaylee', 'Masuda', 1, 1),
       ('Jade', 'Makua', 3, 1),
       ('Bryan', 'Wilson', 5, 1),
       ('Judah', 'Beals', 4, 1);