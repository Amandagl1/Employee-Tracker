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
  const [department] = await db.promise().query('SELECT * FROM department')
  const departmentArray = department.join(department => (
      {
          name: department.name,
          value: department.id
      }
  ));
    inquirer.prompt({type: 'input', name: 'departmentName', message: 'Enter the name of the new department.'})
    .then(function(data) {
      db.query(
          "INSERT INTO role SET ?",
          {
            name: data.departmentName,
            value: data.id
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
  const [employees] = await db.promise().query('SELECT * FROM employee')
  const employeesArray = employees.map(employee => (
      {
          name: employee.name,
          value: employee.id
      }
  ));

    inquirer.prompt([{type: 'input', name: 'First_Name', message: 'Enter the first name of the new employee.'},
    {type: 'input', name: 'Last_Name', message: 'Enter the last name of the new employee.'},
    {type: 'input', name: 'Role', message: 'Select their role.', choices: employeesArray},
    {type: 'input', name: 'Manager', message: 'Enter the name of the manager.'}

  ]).then(function(data) {

    db.query(
        "INSERT INTO role SET ?",
        {
          first_name: data.First_Name,
          last_name: data.Last_Name,
          role_id: data.Role,
          manager_id: data.Manager
        },

        function(err) {
            if (err) throw err
            console.table(data);
            mainMenu();
        }
    )
  
  });
}

// const roleArray = [];
// function selectRole() {
//   db.query("SELECT * FROM role", function(err, data) {
//     if (err) throw err
//     for (var i = 0; i < data.length; i++) {
//       roleArray.push(data[i].title);
//     }

//   })
//   return roleArray;
// }

// const managersArray = [];
// function selectManager() {
//   db.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, data) {
//     if (err) throw err
//     for (var i = 0; i < data.length; i++) {
//       managersArray.push(data[i].first_name);
//     }

//   })
//   return managersArray;
// }

mainMenu();
