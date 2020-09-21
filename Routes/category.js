const express = require('express');
const router = express.Router();
const { createCategory } = require("../Controllers/category");
const { requireSignin, isAuth, isAdmin } = require("../Controllers/auth");
const { findUserById } = require("../Controllers/user");

router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, createCategory);

router.param('userId',findUserById)

module.exports = router;