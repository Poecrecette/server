//validation 
const Joi = require('@hapi/joi');


//register validation 
const registerValidation =(data) =>{
    //schema de sign up
    const schema = {
        name: Joi.string()
                  .min(4)
                  .required(),
        email: Joi.string()
                  .min(4)
                  .required()
                  .email(),
        password: Joi.string()
                  .min(4)
                  .required(),        
    };
    return Joi.validate(data, schema);
};
const loginValidation =(data) =>{
    //schema de login validation 
    const schema = {
        email: Joi.string()
                  .min(6)
                  .required()
                  .email(),
        password: Joi.string()
                  .min(6)
                  .required(),        
    };
    return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
