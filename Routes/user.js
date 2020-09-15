const express = require('express');
const router = express.Router();
const { signup } = require("../Controllers/user");

router.post("/signup",signup);

module.exports = router;