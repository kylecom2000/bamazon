var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  connection.query("SELECT * FROM products;", function(err, res){
    if(err) throw err;
    for(var i =0; i < res.length; i++){
      console.log(`
      ${res[i].product_name} $${res[i].price}
      `);
    }
    
  });
  connection.end();
});
