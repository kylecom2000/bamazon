//
const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk");

//
const connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

//
const divider =`------------------------------------------------------------`;
let idNumber = 0;
let purchaseQuant = 0;

// 
connection.connect(function(err) {
    if (err) throw err;
    // console.log(`Connected as id ${connection.threadId} \n`);
    console.clear();
    console.log(chalk`
{red ${divider}
${divider}}
                    Welcome to Bamazon!
{blue ${divider}
${divider}}`);
    mainPrompt();
});

// 
function mainPrompt(greeting) {
    inquirer.prompt([
      {
        type: "list",
        name: "UserChoicePrompt",
        message: `What would you like to do?`,
        choices: ["Purchase Items?","List Items?","Exit"]
      }
  
    ]).then(function(user) {
        const userC = user.UserChoicePrompt;
        if (userC === "Purchase Items?") {
            forSale();
        }
        else if (userC === "List Items?") {
            listStoreItems();
        }
        else if (userC === "Exit") {
            exitStore();
        }
        else {
            mainPrompt();
        }
    });
  }

// 
function listStoreItems () {
    console.clear();
    connection.query("SELECT * FROM products;", function(err, res){
        if(err) throw err;
        console.log(divider);
        for(var i =0; i < res.length; i++){
            let productList =
            `ID:${res[i].item_id}--${res[i].product_name} - $${res[i].price} - ${res[i].department_name} - ${res[i].stock_quantity}`;
            console.log(productList);
        }
        console.log(divider);
        mainPrompt();
    });
}

// 
function forSale (){
    console.clear();
    connection.query("SELECT * FROM products;", function(err, res){
        if(err) throw err;
        console.log(divider);
        for(var i =0; i < res.length; i++){
            let productList =
            `ID:${res[i].item_id}--${res[i].product_name} - $${res[i].price} - ${res[i].department_name} - ${res[i].stock_quantity}`;
            console.log(productList);
        }
        console.log(divider);
        whatID();
    });
}

// 
function whatID (){
    inquirer.prompt([
        {type: "input",
        name: "purchaseID",
        message: "Which item ID#?"}]).then(function(res) {
                // console.log(res.purchaseID);
                idNumber = res.purchaseID;
                howManyUnits();
            })
}

// 
function howManyUnits () {
    inquirer.prompt([
        {

        type: "input",
        name: "purchaseQuant",
        message: "How many?"

        }]).then(function(res) {
                // console.log(idNumber);
                purchaseQuant = res.purchaseQuant;
                purchaseMade();
            })

    // then function with idNumber and howManyUnits to deduct from database
}

// 
function purchaseMade() {
    console.log("ONE")
    connection.query(`SELECT * FROM products WHERE item_id = ${idNumber};`, function(err, res){
        console.log("TWO")
        if(err) throw err;
        console.log("THREE");
        let theseResults = JSON.stringify(res)
        console.log(theseResults);
        console.log(theseResults);
        
        console.log(purchaseQuant);
        // console.log(res.stock_quantity);
        // console.log(res.products.stock_quantity);
        if(purchaseQuant <= res.stock_quantity){
            console.log("FOUR");
            connection.query("UPDATE products SET ? WHERE ?", 
            {
                stock_quantity: 100
            },{
                item_id: idNumber
            },
            function(err, res) {
                console.log(chalk`{red You have purchased ${purchaseQuant} ${res.product_name}`);
            });
        }
        // if (purchaseQuant > res.stock_quantity){
        //     console.log("FIVE")
        //     console.log("We don't have that many, please stop being so greedy.");
        //     howManyUnits();
        // } 
        
    })
    // TO DO If purchase quantity is >= stock_quantity then do purchase
    // if else (purchase quan is <= 0, NO PURCHASE) {run }
    
    // subtract 
    // connection.query WHERE id IS idNumber
    // subtract from quantity, 
    
    // TO DO don't run main prompt, but go back to whatID();
}

// 
function exitStore() {
    console.log("Thanks for shopping!")
    connection.end();
}


 // whatID will return the ID number of the selected then....
// guery the info on the now GLOBAL "productsList" variable.
// how many will determine 
