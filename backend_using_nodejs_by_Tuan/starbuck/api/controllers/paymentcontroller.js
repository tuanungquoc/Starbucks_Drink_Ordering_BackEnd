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
                    res.status(204).send();
                    //return done(err, null);
                }else{
                    order.status = status.OrderStatus['PAID'].key;
                    order.message = "Payment Accepted.";
                    order.save(function(er) {
                      if (er)
                        res.status(204).send();
                      else
                        res.json(order);
                    });
                }
    });
}
// //GET /order/{order_id} operationId
// function getOrder(req, res, next) {
//     var order_id = req.swagger.params.order_id.value; //req.swagger contains the path parameters
//     var order = db.find(order_id);
//     if(order) {
//         res.json(order);
//     }else {
//         res.status(204).send();
//     }
// }
// // //PUT /movie/{id} operationId
// // function update(req, res, next) {
// //     var id = req.swagger.params.id.value; //req.swagger contains the path parameters
// //     var movie = req.body;
// //     if(db.update(id, movie)){
// //         res.json({success: 1, description: "Movie updated!"});
// //     }else{
// //         res.status(204).send();
// //     }
// //
// // }
//
// //DELETE /order/{order_id} operationId
// function cancelOrder(req, res, next) {
//     var order_id = req.swagger.params.order_id.value; //req.swagger contains the path parameters
//     if(db.remove(order_id)){
//         res.json({success: 1, description: "Movie deleted!"});
//     }else{
//         res.status(204).send();
//     }
//
// }
