var express = require('express');
var router = express.Router();
const Article = require('../controller/articleController')
const Auth = require('../middleware/middle')

/* GET home page. */
router.post('/addArticle',Auth.authorization,Article.addArticle)
router.get('/allArticle',Article.getArticle)
router.put('/editArticle/:id',Auth.authorization,Article.editArticle)
router.get('/getOne/:id',Article.getOneArticle)
router.delete('/delete/:id',Auth.authorization,Article.deleteArticle)

module.exports = router;
