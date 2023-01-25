const db = require('./connection/connection');
const inquirer = require('inquirer');

const mainMenu = () => {
    inquirer.prompt({
        type: 'list',
        name: 'query',
        message: 'Which employee would you like to search?',
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

const addDepartment = () => {
    inquirer.prompt({type: 'input', name: 'departmentName', message: 'Enter the name of the new department.'})
    mainMenu();
  }

const addRole = async() => {
    const [departments] = await db.promise().query('SELECT * FROM department')
    const departmentArray = departments.map(department => (
        {
            name: department.name,
            value: department.id
        }
    ));
    inquirer.prompt([{type: 'input', name: 'roleTitle', message: 'Enter the name of the new role.'},
    {type: 'input', name: 'salary', message: 'Enter the salary.'},
    {type: 'list', name: 'department', message: 'Select the department', choices: departmentArray}
])


}
const addEmployee = () => {
    inquirer.prompt([{type: 'input', name: 'firstName', message: 'Enter the first name of the new employee.'},
    {type: 'input', name: 'lastName', message: 'Enter the last name of the new employee.'},
    {type: 'input', name: 'role', message: 'Enter their role.', choices: selectRole},
    {type: 'input', name: 'manager', message: 'Enter the name of the manager.', choices: selectManager}

  ]).then(function(data) {
      const roleId = selectRole().indexOf(data.role) + 1
      const managerId = selectManager().indexOf(data.choice) + 1
      db.query("INSERT INTO employee SET ?", 
      
        {
          first_name: data.firstName,
          last_name: data.lastName,
          role_id: roleId,
          manager_id: managerId,
        },

      function(err) {
        if (err) throw err
        console.table(data)
        mainMenu()
      })
    });
}

const roleArray = [];
function selectRole() {
  db.query("SELECT * FROM role", function(err, data) {
    if (err) throw err
    for (var i = 0; i < data.length; i++) {
      roleArray.push(data[i].title);
    }

  })
  return roleArray;
}

const managersArray = [];
function selectManager() {
  db.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, data) {
    if (err) throw err
    for (var i = 0; i < data.length; i++) {
      managersArray.push(data[i].first_name);
    }

  })
  return managersArray;
}

mainMenu();
