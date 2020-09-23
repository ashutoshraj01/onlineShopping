const express = require('express');
const router = express.Router();
const { createCategory, findCategoryById, read } = require("../Controllers/category");
const { requireSignin, isAuth, isAdmin } = require("../Controllers/auth");
const { findUserById } = require("../Controllers/user");

router.get("/category/:categoryId", read);
router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, createCategory);
router.param("categoryId",findCategoryById);

router.param('userId',findUserById) 

module.exports = router;