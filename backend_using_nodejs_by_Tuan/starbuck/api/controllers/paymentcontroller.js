var db = require('../../config/db')();
var Order = require('../models/order');
var crypto = require('crypto');
var status = require('../models/orderstatus');
module.exports = {payOrder};

//POST /placeOrder
function payOrder(req, res, next) {
    var order_id = req.swagger.params.order_id.value;
    Order.findOne({_id:order_id}, function(err, order){
                if (err){
                    res.status(404).json(
                      {
                        "status": "error",
                        "message": "Order not found"
                      }
                    );
                }else{
                     if(order.status == status.OrderStatus['PAID'].key){
                       res.status(412).json(
                         {
                           "status": "error",
                           "message": "Order Payment Rejected"
                         }
                       );
                     }else{
                      order.status = status.OrderStatus['PAID'].key;
                      order.message = "Payment Accepted.";
                      order.links.payment = "Test";
                      order.save(function(er) {
                        if (er){
                          res.status(500).json(
                            {
                              "status": "error",
                              "message": "Cannot make payment"
                            }
                          );
                        }else
                          var payload = JSON.parse(JSON.stringify(order));
                          delete payload.links.payment;
                          res.json(payload);
                      });
                    }
                }
    });
}
