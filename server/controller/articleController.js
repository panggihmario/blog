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
        .populate({
            path:'comment',populate:{path:'user'}
        })
        .then(allArticle=>{
            res.status(200).json(allArticle)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }

    static getOneArticle(req,res){
        Article.findOne({
            _id: req.params.id
        })
        .populate('user')
        .populate({
            path:'comment',populate:{path:'user'}
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
        let user = req.user
        // console.log(user);
        Article.findOne({
            _id:req.params.id
        })
        .then(article=>{
            console.log(typeof article.user,"=============",typeof user._id);
            if(String(article.user) === String(user._id)){
                console.log('tes');
                
                Article.deleteOne({
                    _id : req.params.id
                },function(err,data){
                    if(err){
                        res.status(400).json(err)
                    }else{
                        res.status(200).json(data)
                    }
                })
            }else{
                res.status(400).json({msg:'you are not authorized'})
            }
            
        })
      
    }
}

module.exports = Controller