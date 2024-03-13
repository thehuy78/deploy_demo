const mongoose = require('mongoose');



let product = mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number
})

module.exports = mongoose.model('products',product)