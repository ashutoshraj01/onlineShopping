const User = require('../Models/user');
const { errorHandler } = require('../Helpers/dbErrorHandler');
const jwt = require('jsonwebtoken');  // to generate signed token
const expressJwt = require('express-jwt'); // for authorization check

exports.signup = (req,res) =>{
   console.log("req.body--->",req.body);
    const user = new User(req.body);
   user.save((err,user) => {
        if(err){
            return res.status(400).json({
                err: errorHandler(err)
            })
        }
         user.salt = undefined;
         user.hashed_password = undefined;
         return res.json({user});
   });

};

exports.signIn = (req, res) => {
    // find user based on email
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) =>{
        // user not found
        if(err  || !user){
            return res.status(400).json({
                error:'User with this email doesn\'t exist. Please signup!'
            })
        }
        // user found
        // make sure email and password are matched!
          if(!user.authenticate(password)){
              return res.status(401).json({
                  error: "Email and password doesn't match!" 
              })
          }         

        // generate a signed token with user id and secret
            const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET);
            res.cookie('TOKEN', token, {expire: new Date() + 9999 })
            const { _id, name, email, role } = user;
            return res.json({token, user: {_id,name,email,role}})
    });
}


exports.signOut = (req, res) => {
     res.clearCookie('TOKEN');
     res.json({message: ' SignOut Succesfully!'})
}

exports.requireSignin = expressJwt({
    secret: 'SECRET_KEY', // process.env.JWT_SECRET not working properly, here!
    algorithms: ['HS256'],
    userProperty: "auth"
})

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id
    if(!user){
        return res.status(403).json({
            error: "Access Denied"
        })
    }
    next();
}

exports.isAdmin = (req,res,next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error: "Access Denied for admin"
        })
    }
    next();
}