const express = require('express');
const router = express.Router();
const { hi } = require("../Controllers/user.js");

router.get("/",hi);

module.exports = router;