const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Employee objects will be pushed to this empty array
const employees = [];

//First question to determine what the next series of questions will be
const firstQuestion = {
    type: 'list',
    choices: ['Manager', 'Engineer', 'Intern', 'I am done adding employees.'],
    message: 'What employee would you like to add?:',
    name: 'choice'
}

//Manager questions
const mq = [{
    type: 'input',
    name: 'name',
    message: 'What is this manager\'s name?'
},
{
    type: 'input',
    name: 'email',
    message: 'What is this manager\'s email?'
},
{
    type: 'number',
    name: 'extra',
    message: 'What is this manager\'s office number?'
}];

//Engineer questions
const eq = [{
    type: 'input',
    name: 'name',
    message: 'What is this engineer\'s name?'
},
{
    type: 'input',
    name: 'email',
    message: 'What is this engineer\'s email?'
},
{
    type: 'input',
    name: 'extra',
    message: 'What is this engineer\'s GitHub username?'
}];

//Intern questions
const iq = [{
    type: 'input',
    name: 'name',
    message: 'What is this intern\'s name?'
},
{
    type: 'input',
    name: 'email',
    message: 'What is this intern\'s email?'
},
{
    type: 'input',
    name: 'extra',
    message: 'What is this intern\'s school?'
}];

//Code to answer questions based upon previous answers, push employees to the array and then create a team.html file using the render function
const questionChain = async () => {
    let keepGoing = true;
    let i = 0;
    //While the user does not choose to be done, thi loop will continue
    while (keepGoing) {
        //The user is asked which employee type they would like to add
        await inquirer.prompt(firstQuestion)
        .then(async answer => {
            //Choice will be set according to the user's selection
            const choice = answer.choice === 'Manager' ? mq :
            answer.choice === 'Intern' ? iq :
            answer.choice === 'Engineer' ? eq : false;

            //keepGoing is set to true or false based on the user's selection
            keepGoing = Boolean(choice);

            //If keepGoing is still true, the user will be asked questions based on their selection
            if (keepGoing) {
                await inquirer.prompt(choice)
                .then(answers => {
                    //The user choice is destringed to be used as the class name
                    let EmployeeType = eval(answer.choice);
                    //The new employee is pushed to the employees array
                    employees.push(new EmployeeType(answers.name, i, answers.email, answers.extra));
                })
            };
        });
        i++;
    };
    //The team.html file is written using the render function
    fs.writeFile(outputPath, render(employees), () => console.log('Your team.html file has been added to "output".'));
};

//The app is initialized
questionChain();