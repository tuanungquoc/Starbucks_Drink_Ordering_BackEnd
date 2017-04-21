//Include crypto to generate the movie id
var crypto = require('crypto');

module.exports = function() {
    return {
        orderList : [],
        /*
         * Save the movie inside the "db".
         */
        save(order) {
            order.order_id = crypto.randomBytes(20).toString('hex'); // fast enough for our purpose
            this.movieList.push(order);
            return 1;
        },
        /*
         * Retrieve a movie with a given id or return all the movies if the id is undefined.
         */
        find(order_id) {
            if(order_id) {
                return this.orderList.find(element => {
                        return element.order_id === order_id;
                    });
            }else {
                return this.orderList;
            }
        },
        /*
         * Delete a movie with the given id.
         */
        remove(order_id) {
            var found = 0;
            this.orderList = this.orderList.filter(element => {
                    if(element.order_id === order_id) {
                        found = 1;
                    }else {
                        return element.order_id !== order_id;
                    }
                });
            return found;
        },
        /*
         * Update a movie with the given id
         */
        update(order_id, order) {
            var orderIndex = this.orderList.findIndex(element => {
                return element.order_id === order_id;
            });
            if(orderIndex !== -1) {
                this.orderList[orderIndex].title = order.title;
                this.orderList[orderIndex].year = order.year;
                return 1;
            }else {
                return 0;
            }
        }
    }
};
