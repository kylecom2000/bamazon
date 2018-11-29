var mysql = require("mysql");
var inquirer = require("inquirer");

const divider =
`\n------------------------------------------------------------`;

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log(`onnected as id ${connection.threadId} \n`);
    mainPrompt();
});

function listStoreItems(){
    connection.query("SELECT * FROM products;", function(err, res){
        if(err) throw err;
        console.log(divider);
        for(var i =0; i < res.length; i++){
            var productList =
            `ID:${res[i].item_id}--${res[i].product_name} - $${res[i].price} - ${res[i].department_name} - ${res[i].stock_quantity}`;
            console.log(productList);
        }
        console.log(divider);
        whatID();
        
    });
    return;
}


function exitStore() {
    console.log("Thanks for shopping!")
    connection.end();
}

function mainPrompt() {
    inquirer.prompt([
  
      {
        type: "list",
        name: "UserChoicePrompt",
        message: "What would you like to do?",
        choices: ["Purchase Items?","List Items?","Exit"]
      }
  
    ]).then(function(user) {
        const userC = user.UserChoicePrompt;
        if (userC === "Purchase Items?") {
            listStoreItems(); 
            //consider passing in another variable(type bool) into listStore Items that determines if we want input back or not, and only run whatID if that is true?-C (LEAVE THIS COMMENT)
            // Alright. I have to read that many times.
            // delete it when your are done!! =D
            // thanks mang
            // NOW he shows up. I still got work to do. But fixed one issue. Kind of. Just trying to ficgure out 
            // how to not do things asynchronously
            // 
            // I had a doctors appt butthole....k
            // async is very tight butthole // yeah. -kb
            // so the listStoreItems function shouldn't be called both in this if statement and in the List Items statement, since one only displays stuff while the other 
            // lets you select from them
            // yeah. I wanted list items to be more universal. So I could call it and then afterwards, either go back to main menu, OR call the whatID function in 
            // order to make purchases.
            //  I'm kicking you out now. do it. kill me I can't figure out how though.

            // fuck your couch, neighbor!
            // 
            // i get it, its better to consolidate functions or make them more versatile but its more work. props tho          
            // YEAH that's true.  Thanks for taking a look.
            // Alright. So I am just going to have two separate functions. of course.   yeah. Alright. Whatever. 
            // I just wanted it to work like I wanted it to. Not the way javascript works.
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

function whatID (){
    inquirer.prompt([
        {
        type: "input",
        name: "purchastID",
        message: "Item # ?"
        }

        ]).then(function(user) {
            const userC = user.purchaseID;
            console.log(userC);
        }).then(function(user){

        });
}