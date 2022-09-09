const mysql = require(`mysql2`);
const inq = require(`inquirer`);
const table = require(`console.table`);
const add = require('./lib/add');
const update = require('./lib/update');
const list = require('./lib/view');
require(`dotenv`).config();


const connection = mysql.createConnection(
    {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'password',
    database: 'employeeTracker_db'
  },
  console.log(`connected to the employeeTracker_db`)
  );


connection.connect(function(err){
    if(err) throw err;
    exports.start();
});

exports.start = () => {
    inq.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: [
                'VIEW ALL Employees',
                'ADD Employee',
                'UPDATE Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'EXIT'
            ]
        }
    ])
    .then(function(answer) {
        if(answer.choice === 'VIEW ALL Employees'){
            list.viewAllEmployees();
        } else if (answer.choice === 'ADD Employee'){
            add.addEmployee();
        } else if(answer.choice === 'UPDATE Employee Role'){
            update.updateEmployeeRole();
        } else if(answer.choice === 'View All Roles') {
            list.viewAllRoles();
        } else if(answer.choice === 'Add Role') {
            add.addRole();
        } else if(answer.choice === 'View All Departments') {
            list.viewAllDepartments();
        } else if(answer.choice === 'Add Department') {
            add.addDepartment();
        } else {
            console.log("Thank you have a wonderful day!");
            connection.end();
            return
        }
    })
}