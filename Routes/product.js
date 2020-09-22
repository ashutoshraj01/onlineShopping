const express = require('express');
const router = express.Router();
const { createProduct } = require("../Controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../Controllers/auth");
const { findUserById } = require("../Controllers/user");

router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, createProduct);

router.param('userId',findUserById) 

module.exports = router;