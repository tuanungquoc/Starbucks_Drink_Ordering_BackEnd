// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

//var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var orderItem = new mongoose.Schema(
  {
    qty: Number,
    name: String,
    milk: String,
    size: String
  },
  {
    _id:false
  }
)

var orderLinks = new mongoose.Schema(
  {
    payment: String,
    order: String
  },
  {
    _id:false
  }
)
var orderSchema = new mongoose.Schema({
    location : String,
    items: [orderItem],
    links: orderLinks,
    status: String,
    message: String
},{versionKey: false});


// create the model for users and expose it to our app
module.exports = mongoose.model('Order', orderSchema);
