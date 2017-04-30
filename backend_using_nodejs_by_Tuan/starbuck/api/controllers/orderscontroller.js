// Include our "db"
var db = require('../../config/db')();
var Order = require('../models/order');
var crypto = require('crypto');
var status = require('../models/orderstatus');
var gateway = require('../../config/apigateway')
// Exports all the functions to perform on the db
module.exports = {getListOfOrders};


//GET /order/{order_id} operationId
function getListOfOrders(req, res, next) {
    Order.find({}, function(err, order){
                if (err){
                  res.status(404).json(
                    {
                      "status": "error",
                      "message": "Orders not found"
                    }
                  );
                }else{
                    res.json(order);
                }

    });
}
