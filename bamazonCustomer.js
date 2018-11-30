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

// Global varaiables, visual, user's choices, 
const divider =`------------------------------------------------------------`;
let productList;
let idNumber;
let purchaseQuan = 0;


// 
connection.connect(function(err) {
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId} \n`);
    console.clear();
    console.log(chalk`
{red ${divider}
${divider}}
                    Welcome to BAMAZON!
{blue ${divider}
${divider}}`);

    mainPrompt();
});

// function getProductList (){}
// connection.query("SELECT * FROM products;", function(err, res){
//     if(err) throw err;
//     for(var i =0; i < res.length; i++){
//         productList =
//         `ID:${res[i].item_id}--${res[i].product_name} - $${res[i].price} - ${res[i].department_name} - ${res[i].stock_quantity}`;
//         console.log(productList);
//     }
// }

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
            productList =
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
            productList =
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
        message: "Which ID#? (Enter)"}
        ]).then(function(res) {
            idNumber = res.purchaseID;
            
            if (idNumber > 0 && idNumber < itemsArray.length) {
                if (itemsArray[(idNumber - 1)].stock_quantity === 0){
                    console.log(`Sorry! We are out of ${itemsArray[idNumber - 1].product_name}`);
                    whatID(itemsArray);
                }
                else {
                    howManyUnits(itemsArray);
                }
            } 
            else if (idNumber > itemsArray.length || idNumber < 0 || isNaN(idNumber)){
                console.log("Sorry, that ID number doesn't exist.");
                whatID(itemsArray);
            }
            else {
                console.clear();
                listStoreItems();
                return;
                }
            });
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
                purchase(itemsArray);
                
            } else {
                whatID(itemsArray);
            }
        })
}

// 
function purchase(itemsArray) {
        if (purchaseQuan > itemsArray[idNumber-1].stock_quantity){
            console.log("Currently, We don't have that many.");
            howManyUnits(itemsArray);
        }
        if(purchaseQuan <= itemsArray[idNumber-1].stock_quantity){
            goodPurchase(itemsArray);
        }

}

//
function goodPurchase (itemsArray) {
    let stockNumber = itemsArray[idNumber-1].stock_quantity;
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
            listStoreItems();
            console.log(chalk`{red You have purchased ${purchaseQuan} ${itemsArray[idNumber-1].product_name}!!!}`);
        }
    );
}

// 
function exitStore() {
    console.log(chalk`{red Thanks for shopping with BAMAZON!!}`)
    connection.end();
}
