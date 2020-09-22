const express = require('express');
const router = express.Router();
const { createProduct, findProductById, readAndModifyProduct, deleteProduct } = require("../Controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../Controllers/auth");
const { findUserById } = require("../Controllers/user");

router.get("/product/:productId", readAndModifyProduct)
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, createProduct);
router.delete("/product/:productId/:userId", requireSignin, isAuth, isAdmin, deleteProduct);

router.param('userId',findUserById)
router.param('productId',findProductById) 

module.exports = router;