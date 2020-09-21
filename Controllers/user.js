const User = require('../Models/user');

exports.findUserById = (req,res,next,id) =>{
    User.findById(id).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({
                error:'User Not found!'
            })
        }
        req.profile = user;
        next();
    })
}