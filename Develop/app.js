const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeesArr = [];



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: "Please enter team manager's name.",
            validate: nameInput => {
                if(nameInput){
                    return true;
                } else {
                    console.log('You must provide a name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'Please provide employee id number',
            validate: eId => {
                if(eId) {
                    return true;
                } else {
                    console.log('You must provide an id number');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Please provide email address.',
            validate: email => {
                if(email) {
                    return true;
                } else { 
                    console.log('Must provide email address!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'Please provide office number.',
            validate: officeNum => {
                if(officeNum) {
                    return true;
                } else {
                    console.log('You must provide an office number.');
                    return false;
                }
            }
        }
    ])
    .then(managerInfo => {
        // taking promise data from responses and creating an object
        const { name, managerId, email, officeNumber } = managerInfo;
        // creating a new Manager instance with recieved object.
        const manager = new Manager (name, managerId, email, officeNumber);

        employeesArr.push(manager);

        console.log(manager);

        chooseEmployee();
    });

        const chooseEmployee = () => {
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: 'Which would you like to add to your team?',
                        choices: ['engineer', 'intern']
                    },
                    {
                        type: 'input',
                        name: 'name',
                        message: 'What is employees name?',
                        validate: engineerName => {
                            if(engineerName){
                                return true;
                            } else {
                                console.log('Please enter employee name.')
                                return false;
                            }
                        }
                    },
                    {
                        type: 'input',
                        name: 'id',
                        message: 'Please provide employee ID number.',
                        validate: engineerID => {
                            if (engineerID) {
                                return true;
                            } else {
                                console.log('You must provide an id number!');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'input',
                        name: 'email',
                        message: 'Please provide email.',
                        validate: engineerEmail => {
                            if (engineerEmail) {
                                return true;
                            } else {
                                console.log('Please provide email');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'input',
                        name: 'github',
                        message: "What is employees's github username",
                        when: (eRole) => eRole.role === 'engineer',
                            validate: githubUser => {
                            if(githubUser) {
                                return true;
                            } else {
                                console.log('Please provide github username.');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'input',
                        name: 'school',
                        message: "Please provide school name",
                        when: (eRole) => eRole.role === 'intern',
                            validate: school => {
                                if(school) {
                                    return true;
                                } else {
                                    console.log('Please provide a school');
                                    return false;
                                }
                            }
                    },
                    {
                        type: 'confirm',
                        name: 'newEmployee',
                        message: 'Would you like to add another employee to the team?',
                        default: false
                    }
                ])
                .then(userInput => {
                    let { name, id, email, github, school, role, newEmployee } = userInput;
                    console.log(userInput);
                    let employee;

                    if(role === 'engineer') {
                        employee = new Engineer(name, id, email,github);

                        employeesArr.push(employee);
                        console.log(employeesArr);
                    }

                    if(role === 'intern') {
                        employee = new Intern(name, id, email, school);

                        employeesArr.push(employee);
                        console.log(employeesArr);
                    }

                    if(newEmployee) {
                        chooseEmployee(employeesArr);
                    } else {
                        return employeesArr;
                    }
                }) 
            };
                
                    

        


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
