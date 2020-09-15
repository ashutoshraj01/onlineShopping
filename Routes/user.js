const express = require('express');
const router = express.Router();
const { signup } = require("../Controllers/user");
const { userSignupValidator } = require("../Validators/index"); // middleware

router.post("/signup",userSignupValidator,signup); // first req will be validated, then moved forward

module.exports = router;