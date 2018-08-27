const jwt = require('jsonwebtoken')
const coModels = require('../models/comment')
const Article = require('../models/article')

class Controller{

    static addComment(req,res){

        var decoded = jwt.verify(req.headers.token, 'easy')
        if(decoded){
            coModels.create({
                comment : req.body.comment,
                user: decoded.id
            })
            .then(dataComment=>{
                Article.findByIdAndUpdate({
                    _id : req.params.id
                },{
                    $push:{comment :dataComment._id}
                })
                .then(dataArticle=>{
                    console.log(dataArticle)
                    res.status(200).json({msg:'succes',dataArticle})
                })
                .catch(err=>{
                    res.status(400).json(err)
                })
            })
            .catch(err=>{
                res.status(400).json(err)
            })
        }else{
            res.status(400).json('you have to login first')
        }
      
    }


    static deleteComment(req,res){
        let user = req.user
        coModels.findById({
            _id : req.params.id
        })
        .then(data=>{
            if(String(data.user) == String(user._id)){
                coModels.deleteOne({
                    _id: req.params.id
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