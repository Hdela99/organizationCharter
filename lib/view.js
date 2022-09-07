const mysql = require('mysql2');
const index = require('../index');


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

  exports.viewAllEmployees = () => {
    const lookup = "SELECT e.emp_id, e.first_name, e.last_name, title, salary, dept_name, " +
    "e2.first_name AS manager_first_name, e2.last_name AS manager_last_name " +
    "FROM employee AS E " +
    "INNER JOIN employee_role AS C ON E.emp_role_id = c.role_id " +
    "INNER JOIN department AS D ON C.dept_id = d.dept_id " +
    "LEFT JOIN employee AS E2 ON E.manager_id = E2.emp_id;";
  
    connection.query(lookup, function(err, res) {
        if(err) {throw err }
        console.table(res)
        index.start();
    });
};

exports.viewAllDepartments = () => {
    const depSearch = "SELECT * FROM department";
    connection.query(depSearch, function(err, res) {
        if(err) {throw err}
        console.table(res);
        index.start();
    })
};

exports.viewAllRoles = () => {
    const roleSearch = `SELECT * FROM employee_role ` + 
    `INNER JOIN department ON employee_role.dept_id=department.dept_id;`; 
    connection.query(roleSearch, function(err, res) {
        if(err) {throw err}
        console.table(res);
        index.start();
    })
};

exports.getAllRoles = (cb) => {
    connection.query("SELECT * FROM employee_role", function(err,results) {
        if(err) {throw err};
        cb(results);
    });
};

exports.getAllDepartments = (cb) => {
    connection.query("SELECT * FROM department", 
    function(err,results) {
        if(err) throw err;
        console.log("Showing all departments");
        index.start();
    });
};

exports.getAllEmployees = (cb) => {
    connection.query("SELECT * FROM employee", function(err,results) {
        if(err) throw err; 
        cb(results);
    });
};
