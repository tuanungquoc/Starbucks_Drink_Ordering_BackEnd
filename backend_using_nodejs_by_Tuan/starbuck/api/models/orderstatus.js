var Enum = require('enum');

var OrderStatus = new Enum(['PLACED', 'PAID', 'THREE'], { freez: true });

module.exports = {OrderStatus}
