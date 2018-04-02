'use strict';

/**
 * Queue Management System
 * 
 * Initiates are the queues for the application
 * The queues then take complete responsibility to fulfill the orders
 */

let PendingQueue    = require('./pendingQueue');

let init    = function(server) {
    new PendingQueue();
}



module.exports = init;