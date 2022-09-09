const inq = require("inquirer");
const mysql = require("mysql2");
const index = require("../index");
const view = require("./view");
require(`dotenv`).config({path: '../.env'});

const connection = mysql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employeeTracker_db'
  },
  console.log(`connected to the employeeTracker_db`)
  );

  exports.addEmployee = () => {
    view.getAllRoles(function(rolesResults) {
        var roles = [];
        for(let i = 0; i<rolesResults.length; i++){
            roles.push(rolesResults[i].title);
        }
            view.getAllEmployees(function(employees) {
                var employeeList = [];
                for(let i = 0; i< employees.length; i++ ){
                   employeeList.push(employees[i].last_name);
                }
        var options = [
            {
                type: "input",
                message: "Employee First Name",
                name: "first_name",
                default: "Hector"
            },
            {
                type: "Input",
                message: "Employee Last Name: ",
                name: "last_name",
                default: "De La Cruz"
            },
            {
                type: "list",
                message: "Employee Role: ",
                name: "employee_role",
                choices: roles
            },
            {
                type: "list",
                message: "Who is this employee's Manager?",
                name: "manager",
                choices: employeeList,
            }
        ];
        inq.prompt(options)
        .then((answers) => {
            var roleID;
            var managerID;
            for(var i = 0; i<rolesResults.length; i++){
                if(rolesResults[i].title === answers.employee_role){
                    roleID = rolesResults[i].role_id;
                }
            }

            for(var i = 0; i<employees.length; i++){
                if(employees[i].last_name === answers.manager){
                    managerID = employees[i].emp_id;
                    console.log(managerID);
                }
            }

                connection.query("INSERT INTO employee SET ?;",
                {
                    first_name: answers.first_name,
                    last_name: answers.last_name,
                    emp_role_id: roleID,
                    manager_id: managerID,
                    
                },
                function(err, results){
                    if(err) throw err;
                    console.log("Succesful addition of " + answers.first_name + " " +answers.last_name );
                    index.start();
                });

        });
    });
        })
  };

  exports.addDepartment = () => {
    inq.prompt([
        {
            type: "input",
            message: "What is the new departments name?",
            name: "dept_name"
        }
    ]).then((answers) => {
        connection.query("INSERT INTO department SET ?",
        {
            dept_name: answers.dept_name
        }, 
        function(err, results) {
            if(err) {throw err};
            console.log("Succesful addition of new department: " + answers.dept_name);
            index.start();
        });
    });
  };

  exports.addRole = () => {
        inq.prompt([
            {
                type: "input",
                message: "What is the title of the new role you would like to create?",
                name: "title",
            },
            {
                type: "input",
                message: "What is the salary of the new role you would like to create?",
                name: "salary"
            },
            {
                type: "list",
                message: "Which department does it belong to?",
                name: "dept_id",
                choices: [
                    `1. Sales`,
                    `2. Legal`,
                    `3. Engineering`,
                    `4. Finance`,
                    `EXIT`
                ]
            }
        ]).then((answers) => {
            var dept_id= 0;
            if(answers.dept_id === '1. Sales'){
                dept_id = 1;
            } else if(answers.dept_id === '2. Legal'){
                dept_id = 2;
            } else if(answers.dept_id === '3. Engineering'){
                dept_id = 3;
            }else if( answers.dept_id === '4. Finance'){
                dept_id = 4;
            }else {
                console.log("bringing you back!");
                index.start();
            }
            connection.query("INSERT INTO employee_role SET ?",
            {
                title: answers.title,
                salary: answers.salary,
                dept_id: dept_id,
            },
            function(err, results) {
                if(err) throw err;
                console.log("Succesful Addition of new employee role: " + answers.title);
                index.start();
            });
        })
    };