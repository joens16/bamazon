var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazonDB"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  selectAll();
});


function selectAll() {
  connection.query(`SELECT * FROM products`, (err, res) => {
    if (err) throw err;

    console.log(res);
    connection.end();
    itemsToBuy();
  })
}

// // instantiate
// var table = new Table({
//   head: ['TH 1 label', 'TH 2 label']
// , colWidths: [100, 200]
// });

// // table is an Array, so you can `push`, `unshift`, `splice` and friends
// table.push(
//   ['First value', 'Second value']
// , ['First value', 'Second value']
// );

var itemsToBuy = function () {
  inquirer
    .prompt([
      // Here we create a basic text prompt.
      {
        type: "input",
        message: "What is your the ID of the product you would like to buy?",
        name: "ID"
      },
      {
        type: "input",
        message: "How many units of this product would you like to buy??",
        name: "Units"
      }
    ])
}

