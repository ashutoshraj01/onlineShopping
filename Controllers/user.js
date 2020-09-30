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
    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$set:req.body}, 
        { new:true},
          (err, user) => { 
              if(err){
                  return res.status(400).json({
                      error:'You are not authorized to perform this action!'
                  })
              }
              user.hashed_password = undefined;
              user.salt =undefined;
              return res.json(user)
          }       
        )
    
}