// Include our "db"
var db = require('../../config/db')();
var Order = require('../models/order');

// Exports all the functions to perform on the db
module.exports = {placeOrder, getOrder, cancelOrder};

//POST /placeOrder
function placeOrder(req, res, next) {
    console.log(req.body);
    var myOrder = new Order();
    myOrder.location = req.body.location;
    myOrder.items = req.body.items;
    //console.log(req.body);
    console.log(myOrder);
    myOrder.save(function(err) {
                                  if (err) throw err;
                                  console.log('User saved successfully!');
                                  return 1;
                                });
    res.json({success: 1, description: "Order added to the list!"});
}
//GET /order/{order_id} operationId
function getOrder(req, res, next) {
    var order_id = req.swagger.params.order_id.value; //req.swagger contains the path parameters
    var order = db.find(order_id);
    if(order) {
        res.json(order);
    }else {
        res.status(204).send();
    }
}
// //PUT /movie/{id} operationId
// function update(req, res, next) {
//     var id = req.swagger.params.id.value; //req.swagger contains the path parameters
//     var movie = req.body;
//     if(db.update(id, movie)){
//         res.json({success: 1, description: "Movie updated!"});
//     }else{
//         res.status(204).send();
//     }
//
// }

//DELETE /order/{order_id} operationId
function cancelOrder(req, res, next) {
    var order_id = req.swagger.params.order_id.value; //req.swagger contains the path parameters
    if(db.remove(order_id)){
        res.json({success: 1, description: "Movie deleted!"});
    }else{
        res.status(204).send();
    }

}
