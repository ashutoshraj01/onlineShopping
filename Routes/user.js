const express = require('express');
const router = express.Router();
const { signup, signIn, signOut, requireSignin } = require("../Controllers/user");
const { userSignupValidator } = require("../Validators/index"); // middleware

router.post("/signup",userSignupValidator,signup); // first req will be validated, then moved forward
router.post("/signin",signIn);
router.get("/signout",signOut);


module.exports = router;