let Person = require("../models/person");

function createPerson(id, firstName, lastName, email, phone, salary, date) {
    return  {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        salary: salary, 
        date: date
    }
}

module.exports.Get = function(req, res) {
    Person.getAll(function(error, persons) {
        if (error) {
            res.status(500).json({error: error.message});
        }
        else {
            res.json({data : persons});
        }
    });
}

module.exports.Post = function(req, res) {
    console.log(req.body);
    let newPerson = new Person(req.body);
    Person.createPerson(newPerson, function(error, person) {
        if (error) {
            res.status(500).json({error: error.message});
        }
        else {
            res.status(201).json({});
        }
    });
}