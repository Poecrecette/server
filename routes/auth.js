const express = require('express');
const router = express.Router();
const jwt = require ('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

//import 
const {registerValidation, loginValidation} = require ('../validation')

//post request when user click on signup
router.post('/register', async(req, res)=>{
//first step validate ---
  //validate the data that the user writes{the body is declared in validation.js}
 const {error} =  registerValidation(req.body);
 //we have an object of res error ,we chose the first one inorder to post error message 
 //test postman http://localhost:3001/api/user/register
 //tested with short password(<6 characters)
//res.send(error.details[0].message);
 if(error) return res.status(400).send(error.details[0].message);
//second step checking ---
 //checking if the useremail already in database{findOne is a filter method}
 const emailExist = await User.findOne({ email: req.body.email});
 if (emailExist) return res.status(400).send('email already exist');

 //hash the passwords by generating a salt
 const salt = await bcrypt.genSalt(10);
 const hashedPassword = await bcrypt.hash(req.body.password, salt);


//third step create a new if 'everything is ok'
  //creating new user
  const user = new User({
    name:req.body.name,
    email:req.body.email,
    password:hashedPassword
  })
  //saving data after collecting it
  try{
    const savedUser = await user.save();
    res.send(savedUser);

  }
  //if error catch it and send json error 
  catch(err){
    res.status(400).send(err);
  }
 
 

});


router.post('/login', async (req, res)=>{
  //validation input
  const {error} =  loginValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

//checking if email exist 
  const user = await User.findOne({ email: req.body.email});
  if (!user) return res.status(400).send("email doesn't exist ");
  //check password if correct
 const validPass = await bcrypt.compare(res.body.password, user.password);
 if(!validPass) return res.status(400).send('invalid password');

 //creat and assign a token {a proof that i was logged in}
 //
 const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
 res.header('auth-token', token).send(token);
 //testing postman
 //res.send('logged in');


});
module.exports = router;