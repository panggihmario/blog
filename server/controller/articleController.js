const Article = require('../models/article')

class Controller{

    static addArticle(req,res){
        Article.create({
            title : req.body.title,
            content : req.body.content,
            url : req.body.url
        })
        .then(article=>{
            res.status(200).json(article)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }

    static getArticle(req,res){
        Article.find({})
        .then(allArticle=>{
            res.status(200).json(allArticle)
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
            console.log("=====================",dataEdit)
        })

    }
}

module.exports = Controller