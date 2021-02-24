const express = require('express');
const User = require('../models/User');
const router = express.Router();
//making this post private
const verify = require ('./verifyToken');
//add the verifytoken in the middle of get 
router.get('/', verify , (req, res) =>{
    // res.json({posts: {title: 'my first post',
    //                    description: "random data you should'nt access"
    //                 }
    //             });
    //now we can access our token then the api/post will take place as long as the id of token is given
    res.send(req.user);
   
});



module.exports = router;                 