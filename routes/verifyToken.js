const jwt = require('jsonwebtoken');

//a function to check if the user has a token 
//make it secret function
module.exports = function(req,res,next){
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('access denied');


    try{
        const verified = jwt.verify(token,  process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch (err){
        res.status(400).send('invalid token');
    }
};
