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


//Delete a product
exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
       if(err){
           return res.status(400).json({
               errors:errorHandler(err)
           })
       }

       return res.json({
           message:'Product deleted successfully!'
       })
  });
}

// updating a product
exports.updateProduct = (req, res) => {
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
       let product = req.product;
       product = _.extend(product,fields) // _.extend is used where any change that might occur to nested objects in the objects that are being referenced, will also occur in the object that is extended.

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

// Mostly sold product
// by sell = /products?sortBy=sold&order=desc&limit=4
// Latest Arrivals
// by arrival = = /products?sortBy=createdAt&order=desc&limit=4
// If no params are sent, then all products returned

exports.listAllProducts = (req,res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find()
    .select("-photo")   // removing photo from this call, so that we can have seperate call for photo(saves time)
    .populate('category')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, productList) => {
        if(err){
            return res.status(400).json({
                error: 'Product not found!'
            })
        }

        res.send(productList);
    })
}


exports.findRelatedProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find(
       {
        _id: {$ne: req.product}, 
        category: req.product.category
       }
        )  // ne = not included
      .limit(limit)
      .select("-photo")
      .populate('category', '_id name')
      .exec((err, products) => {
          if(err){
              return res.status(400).json({
                  error:'Product not found!'
              })
          }
         // res.send(products);  // 
          res.json(products);
      })
    }

    exports.listCategories = (req, res) => {
        Product.distinct("category", {}, (err, categories)=>{
            if(err){
                return res.status(400).json({
                    error:'Categories not found!'
                })
            }
            res.json(categories)
        })
    }


    exports.findProductsBySearch = (req, res) => {
        let order = req.body.order ? req.body.order : "desc";
        let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
        let limit = req.body.limit ? parseInt(req.body.limit) : 100;
        let skip = parseInt(req.body.skip);
        let findArgs = {};
     
        for (let key in req.body.filters) {
            if (req.body.filters[key].length > 0) {
                if (key === "price") {
                    // gte -  greater than price [0-10]
                    // lte - less than
                    findArgs[key] = {
                        $gte: req.body.filters[key][0],
                        $lte: req.body.filters[key][1]
                    };
                } else {
                    findArgs[key] = req.body.filters[key];
                }
            }
        }
     
        Product.find(findArgs)
            .select("-photo")
            .populate("category")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: "Products not found"
                    });
                }
                res.json({
                    size: data.length,
                    data
                });
            });
    };

    exports.findProductPhoto = (req, res, next) => {
        if(req.product.photo.data){
            res.set('Content-Type', req.product.photo.contentType);
            return res.send(req.product.photo.data)
        }
        next();
    }