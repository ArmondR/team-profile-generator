const Employee = require('./Employee');

// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
class Engineer extends Employee {
    
    constuctor(github) {
       this.github = github;
    }

    getGithub() {
        return {  

        }
    };

    getRole() {
        return {

        }
    };
};

module.exports = Engineer;