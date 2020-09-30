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

exports.viewUserProfile = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt =undefined;
  return res.json(req.profile);
}


exports.updateUserProfile = (req, res) => {
    
}