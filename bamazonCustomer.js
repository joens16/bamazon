var mysql = require("mysql");
var inquirer = require("inquirer");
// var Table = require('cli-table');


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
  displayItems();
});


var displayItems = () => {
  connection.query(`SELECT * FROM products`, (err, res) => {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      console.log(" - - - - - - - - - - - - -  ")
      console.log("item number: " + res[i].item_id)
      console.log("item: " + res[i].product_name)
      console.log("price: $" + res[i].price)
      console.log(" - - - - - - - - - - - - -  ")

      // console.log(res);
      // connection.end();
    }
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

var itemsToBuy = () => {
  inquirer
    .prompt([
      // Here we create a basic text prompt.
      {
        type: "input",
        message: "What is your the ID of the product you would like to buy?",
        name: "item_id",
        filter: Number
      },
      {
        type: "input",
        message: "How many units of this product would you like to buy??",
        name: "Units",
        filter: Number
      }
    ])
    .then(function (itemsToBuy) {
      var items = itemsToBuy.item_id
      var quantity = itemsToBuy.quantity

      var theQuery = 'SELECT * FROM products WHERE ?';

      connection.query(theQuery, { item_id: items }, function (err, res) {
        if (err) throw err

        if (res.lenght === 0) {
          console.log("Not a valid ID. Please try again")
          displayItems()
        }
        else {
          var productDescription = res[0]

          if (quantity <= productDescription.stock_quantity) {
            console.log(" - - - - - - - - - - - - -  ")
            console.log(productDescription.product_name + " This product is available. Please place an order!")
            console.log(" - - - - - - - - - - - - -  ")

            var queryUpdate = "UPDATE products SET stock_quantity = " + (productDescription.stock_quantity - quantity) + "WHERE item_id = " + items

            connection.query(queryUpdate, function (err, data) {
              if (err) throw err;
              console.log(" - - - - - - - - - - - - -  ")
              console.log("Congrats! Thank you for placing an order! Your total will be $" +quantity * productDescription.price)
              console.log(" - - - - - - - - - - - - -  ")
              connection.end();
              
            })
          }else {
            console.log(" - - - - - - - - - - - - -  ")
            console.log("We apologize. At this time we do not have that quantity available. Please adjust your order for " + productDescription.product_name+ "s")
            console.log(" - - - - - - - - - - - - -  ")

          }
        }
      })
    })
}
