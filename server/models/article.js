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
        ref : 'User'
    }],
    url :{
        type : String,
        required : true
    }
 
})

var article = mongoose.model('Article',blogArticle)

module.exports = article