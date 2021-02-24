const express = require ('express');
const app = express();
//for protecting our db initials 
const dotenv = require ('dotenv');
const mongoose = require('mongoose');
//import routes
const authRoute = require ('./routes/auth');
const postRoute = require ('./routes/posts');
// const cors = require ('cors');
//connect app to mongo db 
dotenv.config();
mongoose.connect(process.env.DATABASE_ACCESS,
{ useNewUrlParser: true} ,
() => console.log('database connected')
);

//middlewares
app.use(express.json());

//routes middlewares
//post postman /http://localhost:3001/api/user/register
app.use('/api/user', authRoute);
// get postman /http://localhost:3001/api/posts
app.use('/api/posts', postRoute);




//activat env
//dotenv.config();
//testing our express
//app.get("/", function(req, res){
  //  res.send('express here!')
//})
//rendering the data 
// //connect app to mongo db 
// const mongoose = require('mongoose');
// mongoose.connect(process.env.DATABASE_ACCESS, () => console.log('database connected'));

// // test our backend 


// //body parser 
// app.use(express.json());
// app.use(cors());
// app.use('/app', routesUrls);

app.listen(3001, function() {
    console.log("express server is running on port 3001");
})