// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {
        this._name = name;
        this._id = id;
        this._email = email;
    }

    get name() {
        console.log(this._name)
    }

    get id() {
        console.log(this._id)
    }

    get email() {
        console.log(this._email)
    }

    get role() {
        console.log('Employee')
    }
}

module.exports = Employee;