const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');  
require('dotenv').config();

// import routes
const authRoutes = require('./Routes/auth');
const userRoutes = require('./Routes/user');
const categoryRoutes = require('./Routes/category');



// DB
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useCreateIndex: true,  
})
.then(()=>{console.log('DB connection established!')})
.catch(err=>{console.log(err)});

// App
const app = express();

 
// Middleware
app.use(morgan('dev')); // logs out the requested route 
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());


// Routes Middleware
app.use(authRoutes);
app.use(userRoutes);
app.use(categoryRoutes);
 

const port = process.env.PORT || 8000;

app.listen(port, ()=>{
  console.log(`Server is listening on ${port}`);
});