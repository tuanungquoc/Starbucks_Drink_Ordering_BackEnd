var Enum = require('enum');

var OrderStatus = new Enum(['PLACED', 'TWO', 'THREE'], { freez: true });

module.exports = {OrderStatus}
