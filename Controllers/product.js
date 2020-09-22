const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require('../Models/product');
const { errorHandler } = require('../Helpers/dbErrorHandler');

// search the product using productId
exports.findProductById = (req, res, next, id) =>{
   Product.findById(id).exec((err,product) =>{
       if(err || !product){
        return res.status(400).json({
            error: "Product not found!"
        })
       }
       req.product = product;
       next();
   })
}

exports.readAndModifyProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}

// storing new product
exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true; // helps in storing image extension
  form.parse(req, (err, fields, files) => {
       if(err){
           return res.status(400).json({
               error: "Image Couldn't be uploaded!"
           })
       }
       const {name, description, price, category, quantity, shipping } = fields
       if(!name || !description || !price || !category || !quantity || !shipping){
        return res.status(400).json({
            error: "All fields are required!"
        })
       }
       let product = new Product(fields)

       if(files.photo){ // here name "photo" depends on the name send by client side
           if(files.photo.size > 1000000){  // 1mb = 1000000 bytes
            return res.status(400).json({
                error: "Image size should be less than 1mb"
            })
           }
           product.photo.data = fs.readFileSync(files.photo.path)
           product.photo.contentType = files.photo.type;

       }

       product.save((err,result) => {
           if(err){
               return res.status(400).json({
                   error: errorHandler(err)
               })
           }
           res.json(result);

       })
  })
}