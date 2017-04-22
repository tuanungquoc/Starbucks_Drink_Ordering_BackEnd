// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model

var orderSchema = new mongoose.Schema({
    location : String,
    items: [{qty: Number,
    name: String,
    milk: String,
    size: String}]
});


// create the model for users and expose it to our app
module.exports = mongoose.model('Order', orderSchema);
