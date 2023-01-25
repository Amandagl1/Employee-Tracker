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
    }).then(({ query }) => {
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
const viewDepartments = () => {
    db.promise().query('SELECT * FROM department').then(([rows]) => {
        console.table(rows)
        mainMenu();
    });
};

const viewRoles = () => {
    db.promise().query('SELECT * FROM role').then(([rows]) => {
        console.table(rows)
        mainMenu();
    });
};

const viewEmployees = () => {
    db.promise().query('SELECT * FROM employee').then(([rows]) => {
        console.table(rows)
        mainMenu();
    });
};

const addDepartment = () => {
    inquirer.prompt({type: 'input', name: 'dptName', message: 'Enter the name of the new department.'})
}
const addRole = async() => {
    const [departments] = await db.promise().query('SELECT * FROM department')
    const departmentArray = departments.map(department => (
        {
            name: department.name,
            value: department.id
        }
    ));
    inquirer.prompt([{type: 'input', name: 'dptTitle', message: 'Enter the name of the new role.'},
    {type: 'input', name: 'salary', message: 'Enter the salary.'},
    {type: 'list', name: 'department', message: 'Select the department', choices: departmentArray}
])
}
const addEmployee = () => {
    inquirer.prompt({type: 'input', name: 'dptName', message: 'Enter the name of the new employee.'})
}

mainMenu();
