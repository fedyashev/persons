var express = require("express");
var router = express.Router();
var persons = require("../controllers/persons");

router.get("/", persons.Get);
router.post("/", persons.Post);

module.exports = router;