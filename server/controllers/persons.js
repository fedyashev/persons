let Person = require("../models/person");

// function createPerson(id, firstName, lastName, email, phone, salary, date) {
//     return  {
//         id: id,
//         firstName: firstName,
//         lastName: lastName,
//         email: email,
//         phone: phone,
//         salary: salary, 
//         date: date
//     }
// }

// GET '/'
module.exports.Get = function(req, res) {
    Person.getAll(function(error, persons) {
        if (error) {
            res.status(500).json({data: error.message});
        }
        else {
            res.status(200).json({data : persons});
        }
    });
}

// POST '/'
module.exports.Post = function(req, res) {
    //console.log(req.body);
    let newPerson = new Person(req.body);
    Person.createPerson(newPerson, function(error, person) {
        if (error) {
            console.log(error);
            res.status(500).json({data: error.message});
        }
        else {
            res.status(201).json({data: person});
        }
    });
}

// PUT '/:id'
module.exports.PutId = function(req, res) {

}

// DELETE '/:id'
module.exports.DeleteId = function(req, res) {
    let id = req.params.id;
    if (isNaN(id)) res.status(404).json({data: "Incorrect request"});
    Person.deletePersonById(id, function(error, person) {
        if (error) {
            console.log(error);
            res.status(500).json({data: `Can't delete person by id=${id}`});
        }
        else if (!person) {
            res.status(404).json({data: `Not exists person by id=${id}`});
        }
        else {
            res.status(204).json({data: `Deleted`});
        }
    });
}