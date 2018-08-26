var mongoose = require('mongoose')

var Schema = mongoose.Schema
var blogArticle = new Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    comment : [{
        type : Schema.Types.ObjectId,
        ref : 'Comment'
    }],
    url :{
        type : String,
        required : true
    },
    user :{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
 
})

var article = mongoose.model('Article',blogArticle)

module.exports = article