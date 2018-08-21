var mongoose = require('mongoose')

var Schema = mongoose.Schema
var blogComment = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    comment :{
        type : String,
        required : true
    }
})

var comment = mongoose.model('Comment',blogComment)

module.exports = comment