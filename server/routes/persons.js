var express = require("express");
var router = express.Router();
var persons = require("../controllers/persons");

// Get all persons
router.get("/", persons.Get);

// Create a new person
router.post("/", persons.Post);

// Update person with id
router.put("/:id", persons.PutId);

// Delete person with id
router.delete("/:id", persons.DeleteId);

module.exports = router;