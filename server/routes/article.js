var express = require('express');
var router = express.Router();
const Article = require('../controller/articleController')

/* GET home page. */
router.post('/addArticle',Article.addArticle)
router.get('/allArticle',Article.getArticle)
router.put('/editArticle/:id',Article.editArticle)

module.exports = router;
