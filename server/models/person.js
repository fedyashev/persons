let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let autoIncrement = require("mongoose-auto-increment");

let PersonSchema = Schema({
    firstName: {type: String, default: null},
    lastName: {type: String, default: null},
    email: {type: String, default: null},
    phone: {type: String, default: null},
    salary: {type: Number, default: 0},
    date: {type: Date, default: Date.now()}
});

PersonSchema.plugin(autoIncrement.plugin, {model: "Person", field: "id", incrementBy: 1});
let Person = mongoose.model("Person", PersonSchema);

module.exports = Person;

Person.createPerson = function(person, callback) {
    person.save(callback);
}

Person.getAll = function(callback) {
    Person.find(callback);
}