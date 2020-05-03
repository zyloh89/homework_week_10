// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

const Employee = require("./lib/Employee");

class Intern extends Employee {
    constructor(name, email, id) {
        super(name, email, id)
    //extend new class
      this.school = school;
    }
      
    getRole() {
        return `Intern`;
    }
    getSchool() {
        return this.school;
    }


}

module.exports = Intern;