// Include our "db"
var db = require('../../config/db')();
var Order = require('../models/order');
var crypto = require('crypto');
var status = require('../models/orderstatus');
var gateway = require('../../config/apigateway')
// Exports all the functions to perform on the db
module.exports = {placeOrder, getOrder, cancelOrder,changeOrder};

//POST /placeOrder
function placeOrder(req, res, next) {
    console.log(req.body);
    var myOrder = new Order();
    myOrder.location = req.body.location;
    myOrder.items = req.body.items;
    myOrder.links = {};
    myOrder.links.payment = "http://"+gateway.host+":"+gateway.port+"/order/" + myOrder._id + "/pay";
    myOrder.links.order = "http://"+gateway.host+":"+gateway.port+"/order/" + myOrder._id;
    myOrder.status = status.OrderStatus['PLACED'].key;
    myOrder.message = "Order has been placed";
    //console.log(req.body);
  //  console.log(myOrder);
    myOrder.save(function(err) {
        if (err){
          res.status(500).json(
            {
              "status": "error",
              "message": "Cannot place order"
            }
          );
        }else{
          res.json(myOrder);
        }
    });


}
//GET /order/{order_id} operationId
function getOrder(req, res, next) {
    var order_id = req.swagger.params.order_id.value; //req.swagger contains the path parameters
    Order.findOne({_id:order_id}, function(err, order){
                if (err){
                  res.status(404).json(
                    {
                      "status": "error",
                      "message": "Order not found"
                    }
                  );
                }else{
                    var payload = JSON.parse(JSON.stringify(order));
                    if(order.status != status.OrderStatus['PLACED'].key){
                      delete payload.links.payment;
                    }
                    res.json(payload);
                }

    });
}

// //PUT /movie/{id} operationId
function changeOrder(req, res, next) {
    var order_id = req.swagger.params.order_id.value; //req.swagger contains the path parameters
    var newOrder = req.body;
    Order.findOne({_id:order_id}, function(err, order){
          if (err){
            res.status(404).json(
              {
                "status": "error",
                "message": "Order not found"
              }
            );
              //return done(err, null);
          }else{
              if(order.status == status.OrderStatus['PLACED'].key){
                  order.location = newOrder.location;
                  order.items = newOrder.items;
                  order.save(function(er) {
                    if (er){
                      res.status(500).json(
                        {
                          "status": "error",
                          "message": "Cannot update order."
                        }
                      );
                    }
                    else
                      res.json(order);
                  });
              }else{
                  res.status(412).json(
                    {
                      "status": "error",
                      "message": "Order Update Rejected."
                    }
                  );
              }
          }
    });
}

//DELETE /order/{order_id} operationId
function cancelOrder(req, res, next) {
    var order_id = req.swagger.params.order_id.value; //req.swagger contains the path parameters
    Order.findOne({_id:order_id}, function(err, order){
          if (err){
            res.status(404).json(
              {
                "status": "error",
                "message": "Order not found"
              }
            );
              //return done(err, null);
          }else{
              if(order == null){
                res.status(404).json(
                  {
                    "status": "error",
                    "message": "Order not found"
                  }
                );
              }else{
                if(order.status != status.OrderStatus['PLACED'].key){
                      res.status(412).json(
                        {
                          "status": "error",
                          "message": "Order Cancel Rejected."
                        }
                      );
                 }else{
                      order.remove(function(er) {
                        if(er){
                          res.status(500).json(
                            {
                              "status": "error",
                              "message": "Cannot cancel order"
                            }
                          );
                        }else{
                            res.json({"success":1,"description":"Order deleted!"});
                        }
                      });

                }
              }
          }
    });
}
