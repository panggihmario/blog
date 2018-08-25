var mongoose = require('mongoose')


const emailValidator = function(email) {
    return /^\w([.!#$%&’*+/=?^_`{|}~-]*?\w+)+@\w+(\.\w{2,3})+$/.test(email);
  };

// const passwordLength = function(password){
//     return /^[a-zA-Z]{5,20}$/.test(password)
// }



var Schema = mongoose.Schema
var blogUser = new Schema({
    name : {
        type : String,
        required : [true,'name required']
    },
    email : {
        type : String,
        required : true,
        validate: [emailValidator, "not valid email format"]
    },
    password : {
        type : String,
        required : true,
        // validate : [passwordLength,"password min 5"]
      
    },
    role : {
        type: String,
        default: 'user' 
    }
 
})



var user = mongoose.model('User',blogUser)

module.exports = user