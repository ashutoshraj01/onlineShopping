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

exports.updateCategory = (req,res)=>{
   const category = req.category
   category.name = req.body.name
   category.save((err,data)=>{
     if(err){   
    return res.status(400).json({
           error: errorHandler(err)
       })
    }
     res.json(data)
   })
}

exports.deleteCategory = (req,res)=>{
    const category = req.category
   category.remove((err,data)=>{
     if(err){   
    return res.status(400).json({
           error: errorHandler(err)
       })
    }
     res.json({
         message:'Category deleted Succesfully!'
     })
   })
}

exports.findCategoryList = (req,res)=>{
  Category.find().exec((err, data) =>{
          if(err){ 
              return res.status(400).json({
                  error: errorHandler(err)
              })
          }
          return res.json(data)
  })
}