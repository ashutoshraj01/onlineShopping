const express = require('express');
const router = express.Router();
const { createCategory, findCategoryById, read, updateCategory, deleteCategory, findCategoryList } = require("../Controllers/category");
const { requireSignin, isAuth, isAdmin } = require("../Controllers/auth");
const { findUserById } = require("../Controllers/user");

router.get("/category/:categoryId", read);
router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, createCategory);
router.put("/category/:categoryId/:userId", requireSignin, isAuth, isAdmin, updateCategory);
router.delete("/category/:categoryId/:userId", requireSignin, isAuth, isAdmin, deleteCategory);
router.get("/categories",findCategoryList);

router.param("categoryId",findCategoryById);
router.param('userId',findUserById) 

module.exports = router;