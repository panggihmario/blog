const User = require('../models/user')
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const saltRounds = 10;

class Controller{
    
    static register(req,res){
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(req.body.password, salt);
        User.findOne({
            email : req.body.email
        })
        .then(data=>{
            if(!data){
                User.create({
                    name : req.body.name,
                    email : req.body.email,
                    password : hash
                })
                .then(dataUser=>{
                    console.log(dataUser)
                    var token = jwt.sign({id:dataUser._id,name:dataUser.name,email:dataUser.email},'easy')
                    res.json({dataUser,token})
                })
                .catch(err=>{
                    res.json(err)
                })
            }
            else{
                res.status(400).json({msg : 'email has already taken'})
            }
        })
        .catch(err=>{
            res.json(err)
        })
        
    }

    static login(req,res){
        User.findOne({
            email : req.body.email
        })
        .then(dataUser=>{
            if(dataUser){
                let checkPassword = bcrypt.compareSync(req.body.password, dataUser.password)
                if(checkPassword){
                    var token = jwt.sign({id:dataUser._id,name:dataUser.name,email:dataUser.email},'easy')
                    res.status(200).json({dataUser,token})
                }else{
                    res.status(400).json({msg : 'wrong password'})
                }
            }else{
                res.status(400).json({msg :'wrong email'})
            }
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }

}

module.exports = Controller