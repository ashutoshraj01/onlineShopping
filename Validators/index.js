exports.userSignupValidator = (req,res, next) => {
   req.check('name','Name is required').notEmpty();
   req.check('email','Email is required').notEmpty();
   req.check('email','Email must be between 3 to 32 character')
    .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    .withMessage('Email must be valid')
    .isLength({
        min:4,
        max:32
    })
   req.check('password','Password is required').notEmpty();
   req.check('password')
   .isLength({
       min:6,
   })
   .withMessage('Password must be at least  6 characters long');
  
   const errors = req.validationErrors();
   if(errors){
       const firstErrors = errors.map(error => error.msg)[0];
       return res.status(400).json({ errors: firstErrors});
   }
   next();
};