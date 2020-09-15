const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./Routes/user');
require('dotenv').config();


// App
const app = express();

// DB
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useCreateIndex: true,  
})
.then(()=>{console.log('DB connection established!')})
.catch(err=>{console.log(err)});


// Routes Middleware
app.use(userRoutes);
 

const port = process.env.PORT || 8000;

app.listen(port, ()=>{
  console.log(`Server is listening on ${port}`);
});