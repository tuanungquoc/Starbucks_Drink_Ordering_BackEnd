// Include our "db"
var db = require('../../config/db')();
var Order = require('../models/order');
var crypto = require('crypto');
var status = require('../models/orderstatus');
// Exports all the functions to perform on the db
module.exports = {placeOrder, getOrder, cancelOrder,changeOrder};

//POST /placeOrder
function placeOrder(req, res, next) {
    console.log(req.body);
    var myOrder = new Order();
    myOrder.location = req.body.location;
    myOrder.items = req.body.items;
    myOrder.links = {};
    myOrder.links.payment = "http://localhost:10010/order/" + myOrder._id + "/pay";
    myOrder.links.order = "http://localhost:10010/order/" + myOrder._id;
    myOrder.status = status.OrderStatus['PLACED'].key;
    myOrder.message = "Order has been placed";
    //console.log(req.body);
  //  console.log(myOrder);
    myOrder.save(function(err) {
        if (err){
          res.status(204).send();
        }
        res.json(myOrder);
        console.log('User saved successfully!');
        return 1;
    });


}
//GET /order/{order_id} operationId
function getOrder(req, res, next) {
    var order_id = req.swagger.params.order_id.value; //req.swagger contains the path parameters
    Order.findOne({_id:order_id}, function(err, order){
                if (err){
                    console.log("errr",err);
                    res.status(204).send();
                    //return done(err, null);
                }else{
                    console.log(order);
                    res.json(order);
                }

    });
}

// //PUT /movie/{id} operationId
function changeOrder(req, res, next) {
    var order_id = req.swagger.params.order_id.value; //req.swagger contains the path parameters
    var newOrder = req.body;
    Order.findOne({_id:order_id}, function(err, order){
                if (err){

                    res.status(204).send();
                    //return done(err, null);
                }else{
                    order.location = newOrder.location;
                    order.items = newOrder.items;
                    order.save(function(er) {
                      if (er)
                        res.status(204).send();
                      else
                        res.json(order);
                    });
                }
    });
}

//DELETE /order/{order_id} operationId
function cancelOrder(req, res, next) {
    var order_id = req.swagger.params.order_id.value; //req.swagger contains the path parameters
    Order.findByIdAndRemove(order_id, function (err, order) {
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        if(err) {
          res.status(204).send();
        }
        res.json({success: 1, description: "Movie deleted!"});
    });
}
