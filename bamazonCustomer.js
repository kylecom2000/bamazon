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
let purchaseQuan = 0;

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
function mainPrompt() {
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
function listStoreItems() {
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
        whatID(res);
    });
}

// 
function whatID(itemsArray){
    inquirer.prompt([
        {type: "input",
        name: "purchaseID",
        message: "Which item ID#?"}
        ]).then(function(res) {
            idNumber = res.purchaseID;
            if (idNumber > itemsArray.length){
                console.log("Sorry, that ID number doesn't exist.")
                whatID(itemsArray);
            }
            if (itemsArray[(idNumber - 1)].stock_quantity === 0){
                console.log("We are out of stock");
                whatID(itemsArray);
            }
            // IF ID's stock_quantity is zero, then restart function?
            else{
                howManyUnits(itemsArray);
            }
        })
}

// 
function howManyUnits(itemsArray) {
    inquirer.prompt([
        {type: "input",
        name: "purchaseQuan",
        message: "How many?"}
        ]).then(function(res) {
            if (res.purchaseQuan > 0){
                purchaseQuan = res.purchaseQuan;
                purchase();
                
            } else {
                whatID(itemsArray);
            }
        })
}

// 
function purchase() {
    console.log("ONE")
    connection.query(`SELECT * FROM products WHERE item_id = ${idNumber};`, function(err, res){
        console.log("TWO")
        if(err) throw err;
        console.log(purchaseQuan);
        if (purchaseQuan > res[0].stock_quantity){
            console.log("We don't have that many.");
            howManyUnits();
        }
        if(purchaseQuan <= res[0].stock_quantity){
            goodPurchase(res[0].stock_quantity);
        }


        // if (purchaseQuan > res[0].stock_quantity){
        //     console.log("FIVE")
        //     console.log("We don't have that many, please stop being so greedy.");
        //     howManyUnits();
        // } 
        
    }) // ----------END OF CONNECTION----------
   
}
function goodPurchase (stockNumber) {
    // console.log("goodPurchase");
    // console.log("IDNUMBER:" + idNumber);
    connection.query("UPDATE products SET ? WHERE ?;", 
        [
            {
                stock_quantity: (stockNumber - purchaseQuan)
            },
            {
                item_id: idNumber
            }
        ],
        function(err, res) {
            console.log("Response after UPDATE:"+res.affectedRows);
            
            // console.log(chalk`{red You have purchased ${purchaseQuan} ${res[0].product_name}`);
        }
    );
}


function purchaseMore(){ 
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
function exitStore() {
    console.log("Thanks for shopping!")
    connection.end();
}


 // whatID will return the ID number of the selected then....
// guery the info on the now GLOBAL "productsList" variable.
// how many will determine 
