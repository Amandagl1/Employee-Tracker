const db = require('./connection/connection');
const inquirer = require('inquirer');

const mainMenu = () => {
    inquirer.prompt({
        type: 'list',
        name: 'query',
        message: 'What would you like to do?',
        choices: [
            'View departments',
            'View roles',
            'View employees',
            'Add department',
            'Add role',
            'Add employee',
            'Exit'
            ]
    }).then(({query}) => {
        switch (query) {
            case 'View departments':
                viewDepartments()
                break;
            case 'View roles':
                viewRoles()
                break;
            case 'View employees':
                viewEmployees()
                break;
            case 'Add department':
                addDepartment()
                break;
            case 'Add role':
                addRole()
                break;
            case 'Add employee':
                addEmployee()
                break;
            case 'Exit':
                process.exit()
            default:
                break;
        }
    });
}

// View all data from 'departnment' and return a table
const viewDepartments = () => {
    db.promise().query('SELECT * FROM department').then(([rows]) => {
        console.table(rows)
        mainMenu();
    });
};

// View all data from 'role' and return a table
const viewRoles = () => {
    db.promise().query('SELECT * FROM role').then(([rows]) => {
        console.table(rows)
        mainMenu();
    });
};

// View all data from 'employee' and return a table
const viewEmployees = () => {
    db.promise().query('SELECT * FROM employee').then(([rows]) => {
        console.table(rows)
        mainMenu();
    });
};

const addDepartment = async() => {

    inquirer.prompt({type: 'input', name: 'departmentName', message: 'Enter the name of the new department.'})
    .then(function(data) {
      db.query(
      "INSERT INTO department SET ?",
        {
          name: data.departmentName,
        },

        function(err) {
          if (err) throw err
          console.table(data);
          mainMenu();
        }
      )
    });
  }

const addRole = async() => {
  const [departments] = await db.promise().query('SELECT * FROM department')
  const departmentArray = departments.map(department => (
      {
          name: department.name,
          value: department.id
      }
  ));

    inquirer.prompt([{type: 'input', name: `Role_Title`, message: 'Enter the name of the new role.'},
    {type: 'input', name: 'Salary', message: 'Enter the salary.'},
    {type: 'list', name: 'Department', message: 'Select the department', choices: departmentArray}

    ]).then(function(data) {
      db.query(
      "INSERT INTO role SET ?",
      {
        title: data.Role_Title,
        salary: data.Salary,
        department_id: data.Department 
      },

      function(err) {
        if (err) throw err
        console.table(data);
        mainMenu();
      }
    )
  });
}

const addEmployee = async() => {
  const [roles] = await db.promise().query('SELECT * FROM role')
  const rolesArray = roles.map(role => (
      {
          name: role.title,
          value: role.id
      }
  ));

    inquirer.prompt([{type: 'input', name: 'First_Name', message: 'Enter the first name of the new employee.'},
    {type: 'input', name: 'Last_Name', message: 'Enter the last name of the new employee.'},
    {type: 'list', name: 'Role', message: 'Select their role.', choices: rolesArray},

  ]).then(function(data) {

    db.query(
        "INSERT INTO employee SET ?",
        {
          first_name: data.First_Name,
          last_name: data.Last_Name,
          role_id: data.Role,
          manager_id: 1
        },

        function(err) {
            if (err) throw err
            console.table(data);
            mainMenu();
        }
    )
  
  });
}

mainMenu();
