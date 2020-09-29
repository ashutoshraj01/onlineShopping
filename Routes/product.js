const express = require('express');
const router = express.Router();
const { 
     createProduct,
     findProductById, 
     readAndModifyProduct, 
     deleteProduct, 
     updateProduct,
     listAllProducts,
     findRelatedProducts,
     listCategories
    } = require("../Controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../Controllers/auth");
const { findUserById } = require("../Controllers/user");

router.get("/product/:productId", readAndModifyProduct)
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, createProduct);
router.delete("/product/:productId/:userId", requireSignin, isAuth, isAdmin, deleteProduct);
router.put("/product/:productId/:userId", requireSignin, isAuth, isAdmin, updateProduct);
router.get('/products', listAllProducts);
router.get('/products/related/:productId', findRelatedProducts)
router.get('/products/categories', listCategories);

router.param('userId',findUserById)
router.param('productId',findProductById) 

module.exports = router;