const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require('../Models/product');
const { errorHandler } = require('../Helpers/dbErrorHandler');

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true; // helps in storing image extension
  form.parse(req, (err, fields, files) => {
       if(err){
           return res.status(400).json({
               error: "Image Couldn't be uploaded!"
           })
       }
       let product = new Product(fields)

       if(files.photo){ // here name "photo" depends on the name send by client side
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