const Category = require('../Models/category');
const { errorHandler } = require('../Helpers/dbErrorHandler');


exports.createCategory = (req,res) => {
     const category = new Category(req.body)
     category.save((err,data) => {
         if(err){
             return res.status(400).json({
                 error: errorHandler(err)
             })
         }
         res.json({data});
     })
}