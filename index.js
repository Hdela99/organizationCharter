const mysql = require(`mysql2`);
const inq = require(`inquirer`);
const table = require(`console.table`);
const add = require('./lib/add');
const update = require('./lib/update');
const list = require('./lib/view');
require(`dotenv`).config();


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  });


connection.connect(function(err){
    if(err) throw err;
    console.log("connected as ID " + connection.threadID + "\n");
    exports.start();
});

exports.start = () => {
    inq.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: [
                'VIEW ALL Employees.',
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
}