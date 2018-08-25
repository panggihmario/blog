const jwt = require('jsonwebtoken')
const User = require('../models/user')

class Controller{
    static authorization(req,res,next){
        let decoded = jwt.verify(req.headers.token,'easy')
        console.log("ini middle",req.body)
        if(decoded){
            User.findOne({
                _id: decoded.id
            })
            .then(dataUser=>{
                if(dataUser._id == decoded.id){
                    next()
                }else{
                    res.status(400).json({msg: 'you are not authorized'})
                }
            })
            .catch(err=>{
                res.status(400).json(err)
            })
        }
    }
}

module.exports = Controller