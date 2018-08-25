const Article = require('../models/article')
const jwt = require('jsonwebtoken')

class Controller{

    static addArticle(req,res){
        var decoded = jwt.verify(req.headers.token, 'easy')
        Article.create({
            title : req.body.title,
            content : req.body.content,
            url : req.body.url,
            user : decoded.id
        })
        .then(article=>{
            console.log(article)
            res.status(200).json(article)
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json(err)
        })
    }

    static getArticle(req,res){
        Article.find({})
        .populate('user')
        .then(allArticle=>{
            res.status(200).json(allArticle)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }

    static getOneArticle(req,res){
        Article.find({
            _id: req.params.id
        })
        .then(article=>{
            res.status(200).json(article)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }

    static editArticle(req,res){
        Article.updateOne({
            _id : req.params.id
        },{
            $set :{
                title : req.body.title,
                content : req.body.content,
                url : req.body.url
            }
        })
        .then(dataEdit=>{
            res.json(dataEdit)
        })

    }

    static deleteArticle(req,res){
        Article.deleteOne({
            _id : req.params.id
        },function(err,data){
            if(err){
                res.status(400).json(err)
            }else{
                res.status(200).json(data)
            }
        })
    }
}

module.exports = Controller