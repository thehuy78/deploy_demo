var express = require('express');
var router = express.Router();
const productModel = require('../model/productModel')

/* GET home page. */
router.get('/', async function(req, res, next) {
  const product = await productModel.find();
  res.render('product/index', { product: product });
});

router.get('/create', async function(req, res, next) {
  res.render('product/create');
});


router.post('/create', async function(req, res, next) {
  const data = req.body
 await productModel.create(data)
  res.redirect('/product');
});

module.exports = router;
