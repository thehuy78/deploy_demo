var express = require('express');
var router = express.Router();
const multer = require('multer')
const fs = require('fs');
const axios = require('axios');


let storaged = multer.diskStorage({
  destination: function(req,res,cb){
    cb(null,'./public/images')
  },
  filename: function(req,file,cb){
    cb(null, `${file.fieldname}-${Date.now()}.jpg`)
  }
})

const upload = multer({storage:storaged});



const url = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-mqyrb/endpoint/data/v1/action/find';
const data = {
  "collection":"products",
  "database":"test",
  "dataSource":"huy",
  "projection": {}
};
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Request-Headers': '*',
  'api-key' : 'sMZh32ouebZNe3F9ydpGliMNh17J4iYoLyYgv6ClcWiSQ9KMGi1KUHvjMT6YYiwp'
};
/* GET home page. */
router.get('/', async function(req, res, next) {
  axios.post(url, data, { headers })
  .then(response => {
    console.log(response.data.documents);
    res.render('product/index',{product: response.data.documents})
  })
  .catch(error => {
    console.error(error);
  });
});

router.get('/create',  function(req, res, next) {
  res.render('product/create');
});


router.post('/create',upload.single('image'), async function(req, res, next) {
  var urls = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-mqyrb/endpoint/data/v1/action/insertOne';
  let prod = req.body
  let file = req.file
  const datas = {
    "collection":"products",
    "database":"test",
    "dataSource":"huy",
    "document": {
      "name": prod.name,
      "price": prod.price,
      "quantity": prod.quantity,
      "image":file.filename
    }
  };
  axios.post(urls, datas, { headers })
  .then(response => {
    console.log(response.data.documents);
    res.redirect('/product');
  })
  .catch(error => {
    console.error(error);
  });
});

module.exports = router;
