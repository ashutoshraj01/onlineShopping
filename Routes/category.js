const express = require('express');
const router = express.Router();
const { createCategory } = require("../Controllers/category");

router.post("/category/create", createCategory);

module.exports = router;