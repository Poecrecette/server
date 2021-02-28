// // const mongoose = require('mongoose')

// // //scheme for app (data to be requested)
// const userSchema = new mongoose.Schema({
//    name: {
//        type: 'string',
//        required: true,
//        min: 6,
//    },
//    email:{
//        type: 'string',
//        required: true,
//    },
//    password:{
//        type: 'string',
//        required: true,
//        min:6,
//    },
//    //this is accessible only on backend to update record any time new user sign up
//    date:{
//        type: Date,
//        default: Date.now
//    }

// })

// module.exports = mongoose.model('User',userSchema);
// const mongoose = require('mongoose')

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// Create Scheme
const UserSchema = new Schema({
   nom: {
        type: String,
        default: '',
        required: true
    },
    prenom: {
        type: String,
        default: '',
        required: true
    },
    email: {
        type: String,
        default: '',
        required: true
    },
    password: {
        type: String,
        default: '',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};


const User = mongoose.model('user', UserSchema);
module.exports = User;