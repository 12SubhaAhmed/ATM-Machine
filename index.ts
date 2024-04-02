#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk"

let myBalance = 10000;  //Dollar
let myPin = 8765;

console.log(chalk.green("\n \tWelcome to My ATM Machine\n"));

let pinAnswer = await inquirer.prompt(
    [ 
       {
           name:"pin",
           message:"Enter your pin",
           type:"number"
       }

    ]
);
if (pinAnswer.pin === myPin) {
    console.log(chalk.yellow("\nCorrect pin code!\n"));

    let operationAns = await inquirer.prompt( 
        [ 
            {
                name:"operation",
                message:"Please select option",
                type:"list",
                choices:["Withdraw", "Check balance"]  

            }
        ]
    );
    console.log(operationAns);

    if (operationAns.operation === "Withdraw"){
        let withdrawAns = await inquirer.prompt([
            {
                name:"withdrawMethod",
                type:"list",
                message:"Select a withdraw method",
                choices:["Fast cash","Enter amount"]
            }
        ])
        if (withdrawAns.withdrawMethod === "Fast cash") {
        let fastCashAns = await inquirer.prompt( 
            [
                {
                    name:"fastCash",
                    message:"Select amount",
                    type:"list",
                    choices:["15000","5000","3000","2000"]
                }
            ]
        );
        if (fastCashAns.fastCash > myBalance){
            console.log(chalk.red("\nInsufficient balance\n"))
        }
       else{
        myBalance -= fastCashAns.fastCash
        console.log(chalk.yellow(`\n${fastCashAns.fastCash} withdraw successfully`))
        console.log(chalk.blue(`Your remaining balance is ${myBalance}`));
       } 
    }
       else if (withdrawAns.withdrawMethod === "Enter amount"){
        let amountAns = await inquirer.prompt([
            {
                name:"amount",
                type:"number",
                message:"Enter the amount to withdraw"
            }
        ])

        if (amountAns.amount > myBalance){
            console.log(chalk.red("\nInsufficient balance\n"));
        }
    else {
        myBalance -= amountAns.amount;
        console.log(chalk.yellow("\nWithdraw successfully"));
        console.log(chalk.blue(`Your remaining balance is ${myBalance}`));
         }
    }
}
    else if (operationAns.operation === "Check balance"){
      console.log(chalk.blue(`\nYour current balance is ${myBalance}\n`))  
    }
}
    else {
    console.log(chalk.red("\nIncorrect pin\n"))
     };
    

    

