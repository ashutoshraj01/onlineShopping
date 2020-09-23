const Category = require('../Models/category');
// const { errorHandler } = require('../Helpers/dbErrorHandler');


exports.createCategory = (req,res) => {
     const category = new Category(req.body)
     category.save((err,data) => {
         if(err){
             return res.status(400).json({
                 error: 'Failed to save category!' // errorHandler(err) not working!
             })
         }
         res.json({data});
     })
}

exports.findCategoryById = (req, res, next,id) => {
   Category.findById(id).exec((err,category)=>{
        if(err){
            return res.status(400).json({error:"Category doesn't exist!"})
        }
        req.category = category;
        next();
   })
}

exports.read = (req,res)=>{
    return res.json(req.category)
}