const inq = require("inquirer");
const mysql = require("mysql2");
const index = require("../index");
const view = require("./view");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  });

  exports.addEmployee = () => {
    view.getAllRoles(function(rolesResults) {
        var roles = [];
        for(let i = 0; i<rolesResults.length; i++){
            roles.push(rolesResults[i].title);
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
            }
            {
                type: "list",
                message: "Employee Role: ",
                name: "employee_role",
                choices: roles
            }
        ];

        inq.prompt(options)
        .then((answers) => {
            var roleID = null;
            for(var i = 0; i<rolesResults.length; i++){
                if(rolesResults[i].title === answers.role){
                    roleID = rolesResults[i].role_id;
                }
            }
                connection.query("INSERT INTO employees SET ?",
                {
                    first_name: answers.first_name,
                    last_name: answers.last_name,
                    emp_role_id: roleID
                },
                function(err, results){
                    if(err) throw err,
                    console.log("Succesful addition of " + answers.first_name + " " +answers.last_name );
                    index.start();
                });

        });
    });
  };