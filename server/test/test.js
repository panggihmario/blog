var chai = require("chai"),
	chaiHtttp = require("chai-http")
chai.use(chaiHtttp)


var mongoose = require('mongoose')
var User = require('../models/user.js')

chai.should()

var url ="http://localhost:3000"

describe('User',function(){
    after(function(done){
        mongoose.connect('mongodb://mario:mario123@ds125602.mlab.com:25602/blog-testing',function(err){
            User.collection.drop()
            done()
        })
    })

    it('POST /users/register should add data user', function(done) {
            chai.request(url)
            .post('/users/register')
            .send({
                'email':'tes@mail.com',
                'name' : 'siapa',
                'name' :"jack",
                "email":"jack@mail.com",
                "password" :"1234",
            })
            .end(function(err,res){
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('dataUser')
                res.body.should.have.property('token')
                res.body.dataUser.should.be.a('object')
                res.body.dataUser.should.have.property('name')
                res.body.dataUser.should.have.property('email')
                res.body.dataUser.should.have.property('password')
                done()
            })
        });

    it('Post /users/login should show data user',function(done){
        chai.request(url)
        .post('/users/login')
        .send({'email' : 'jack@mail.com','password':'1234'})
        .end(function(err,res){
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('dataUser')
            res.body.should.have.property('token')
            res.body.dataUser.should.be.a('object')
            res.body.dataUser.should.have.property('name')
            res.body.dataUser.should.have.property('email')
            res.body.dataUser.should.have.property('password')
            done()
        })
    })


    it('Post /article/addArticle should show data article',function(done){
        chai.request(url)
        .post('/article/addArticle')
        .send({
            'title' : 'testing',
            'content':'tescontent',
            'url' :'testingurl',
            'user' :'1231lk3m'
        })
        .end(function(err,res){
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title')
            res.body.should.have.property('content')
            res.body.should.have.property('url')
            done()
        })
    })

    it('Get /article/allArticle should show all data article',function(done){
        chai.request(url)
        .get('/article/allArticle')
        .end(function(err,res){
            res.should.have.status(200);
            res.body.should.be.a('array');
            done()
        })
    })

    it('Put /article/editArticle/5b7c132819d56d3dcfc6fdd2 should show edit data article',function(done){
        chai.request(url)
        .put('/article/editArticle/:id')
        .send({
            'title' : 'test123',
            'content':'tescontentssada',
            'url' :'testingurlsscokkkkk',
        })
        .end(function(err,res){
            res.should.have.status(200);
            res.body.should.be.a('object');
            done()
        })
    })

})