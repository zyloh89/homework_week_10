// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, email, id, officenumber) {
        super(name, email, id)
    //extend new class
      this.officenumber = officenumber;
    }
      
    getRole() {
        return `Manager`;
    }
    getOfficeNumber() {
        return this.officenumber;
    }


}

module.exports = Manager;