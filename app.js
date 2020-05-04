const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Start application with collecting one manager information  
function addManager () {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'managerName',
            message: "What is your manager's name?",
            validate: function (input) {
                if (input === "") {
                    return "Please enter name."
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'managerEmail',
            message: "What is your manager's email?",
            validate: function (input) {
                const email = input.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
                if (email) {
                    return true;
                }
                return "Please re-enter your email address.";
            }
        },
        {
            type: 'input',
            name: 'managerId',
            message: "What is your manager's ID?",
            validate: function (input) {
                const num = input.match(/^[0-9]+$/);
                if(num) {
                    return true;
                }
                return "Please enter a valid number."
            } 
        },
        {
            type: 'input',
            name: 'managerOfficeNumber',
            message: "What is your manager's office number?",
            validate: function (input) {
                const num = input.match(/^[0-9]+$/);
                if(num) {
                    return true;
                }
                return "Please enter a valid number."
            } 
        },
    ])
}
// Add employee role type
function employeeRole() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'employeeRole',
            message: "Which type of team member would you like to add?",
            choices: [
                "Engineer",
                "Intern",
                "I don't want to add any other team mambers"
            ]
        },
    ]);
}

// Add engineer info
function addEngineer () {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'engineerName',
            message: "What is your engineer's name?",
            validate: function (input) {
                if (input === "") {
                    return "Please enter name."
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'engineerEmail',
            message: "What is your engineer's email?",
            validate: function (input) {
                const email = input.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
                if (email) {
                    return true;
                }
                return "Please re-enter your email address.";
            }
        },
        {
            type: 'input',
            name: 'engineerId',
            message: "What is your engineer's ID?",
            validate: function (input) {
                const num = input.match(/^[0-9]$/);
                if(num) {
                    return true;
                }
                return "Please enter a valid number."
            } 
        },
        {
            type: 'input',
            name: 'engineerGithub',
            message: "What is your engineer's Github username?",
        },

    ])
}

// Add intern info
function addIntern () {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'internName',
            message: "What is your intern's name?",
            validate: function (input) {
                if (input === "") {
                    return "Please enter name."
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'internEmail',
            message: "What is your intern's email?",
            validate: function (input) {
                const email = input.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
                if (email) {
                    return true;
                }
                return "Please re-enter your email address.";
            }
        },
        {
            type: 'input',
            name: 'internId',
            message: "What is your intern's ID?",
            validate: function (input) {
                const num = input.match(/^[0-9]$/);
                if(num) {
                    return true;
                }
                return "Please enter a valid number."
            } 
        },
        {
            type: 'input',
            name: 'internSchool',
            message: "What is your intern's school name?",
        },

    ])
}

// Run async function to collect all information, pushing employee and intern information into an array

async function combineTeam() {
    console.log ("Please build your team");

    const employees = [];
    const endPrompt = false;

    try {
        const managerData = await addManager();
        employees.push (new Manager (managerData.managerName, managerData.managerEmail, managerData.managerId, managerData.managerOfficeNumber));       

        do {
            const addEmployee = await employeeRole();
            
            switch (`${addEmployee.selection}`) {

                case "Engineer":
                    const engineerData = await addEngineer();
                    employees.push (new Engineer (engineerData.engineerName, engineerData.engineerEmail, engineerData.engineerId, engineerData.engineerGithub));
                break;
                
                case "Intern":
                    const internData = await addIntern();
                    employees.push(new Intern(internData.internName, internData.internEmail, internData.internId, internData.internSchool));
                break;

                case "End prompt":
                    endPrompt = true;
                break
            }
        }

        while (endPrompt === false);
            const mainhtml = render(employees);
        fs.writeFileSync(outputPath, mainhtml, function(err){
            if(err){
                return console.log(err);
            }
            console.log("Team roster generated");
        });

    } catch (err) {
        console.log(err);
      }
}


//check if output folder exists (https://nodejs.org/api/fs.html#fs_fs_existssync_path)
function checkOutputFolder() {
    try{
        if(!fs.existsSync(OUTPUT_DIR)){
            fs.mkdirSync(OUTPUT_DIR);
        }
    } catch (err) {
        console.log(err);
    }
}

combineTeam();
checkOutputFolder();
