const mongoose = require('mongoose')

//scheme for app (data to be requested)
const userSchema = new mongoose.Schema({
   name: {
       type: 'string',
       required: true,
       min: 6,
   },
   email:{
       type: 'string',
       required: true,
   },
   password:{
       type: 'string',
       required: true,
       min:6,
   },
   //this is accessible only on backend to update record any time new user sign up
   date:{
       type: Date,
       default: Date.now
   }

})

module.exports = mongoose.model('User',userSchema);