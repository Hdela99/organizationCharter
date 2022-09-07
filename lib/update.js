const inq = require('inquirer');
const mysql = require('mysql2');
const index = require('../index');
const view = require('./view');


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

  exports.updateEmployeeRole = () => {
    view.getAllEmployees(function (employeeResults) {
        console.log("testing");
        console.log(employeeResults);
        const employees = [];
        for(let i = 0; i<employeeResults.length; i++){
            const fullName = {
                name: employeeResults[i].first_name + ' ' + employeeResults[i].last_name,
                value: {
                    id: employeeResults[i].emp_id,
                    first_name: employeeResults[i].first_name,
                    last_name: employeeResults[i].last_name
                }
            };
            employees.push(fullName);
        };

        inq.prompt([
            {
                type: "list",
                message: "Which employee would you like to udpate?",
                name: "employee",
                choices: employees
            }
        ]).then((answers) => {
            view.getAllRoles(function (rolesResults) {
                const roles = [];
                console.log(answer.employee);

                for(let i =0; i<rolesResults.length; i++){
                    var fullRole = {
                        name: rolesResults[i].role_id,
                        role: rolesResults[i].title
                    }
                    roles.push(fullRole);
                };

                inq.prompt([
                    {
                        type: "list",
                        message: `Which role would you like to update ${answer.employee.first_name} to?`,
                        name: "role",
                        choices: roles
                    }
                ]).then((results) => {
                    console.log("results...");
                    console.log(results.role);
                    connection.query("UPDATE employee SET emp_role_id = ? WHERE emp_id = ?", [results.role.id, answers.employee.id], function (err, results){
                        if(err) throw err;
                        console.log("Success, updated " + answers.employee.id);
                        index.start();
                    });
                });
            });
        });
    });
  };