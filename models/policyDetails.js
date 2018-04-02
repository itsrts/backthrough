'use strict';

let InsModel    = require('./insModel');
let Sequelize    = require('sequelize');

let schema      = {
    row_id              : { type : Sequelize.INTEGER(12), primaryKey : true, autoIncrement : true },
    policy_id           : Sequelize.STRING,
    product_id          : { type : Sequelize.INTEGER(12), allowNull : false},
    policy_status       : Sequelize.STRING,
    premiun_price       : Sequelize.FLOAT(10,2),
    total_price         : Sequelize.FLOAT(10,2),
    policy_holder       : Sequelize.STRING,
    policy_provider     : Sequelize.STRING,
    additional_info     : Sequelize.STRING(2048),
    order_id            : Sequelize.BIGINT(12),
    cart_item_id        : Sequelize.BIGINT(20),
    start_date          : Sequelize.DATE,
    end_date            : Sequelize.DATE,
    claim_date          : Sequelize.DATE,
    cancellation_date   : Sequelize.DATE,
    created_at          : Sequelize.DATE,
    updated_at          : Sequelize.DATE,
    insurance_type_id   : Sequelize.STRING,
    merchant_id         : Sequelize.INTEGER(12),
    is_cancellable      : Sequelize.BOOLEAN,
    cust_id             : Sequelize.BIGINT(12),
    claim_amount        : Sequelize.FLOAT(10,2),
};

class PolicyDetails extends InsModel {

    constructor() {
        super('p_details', schema);
    }
}


module.exports = new PolicyDetails();

// new PolicyDetails().insert({policy_id : "ok7"})
// new PolicyDetails().findOne({id : 3}, true)
// new PolicyDetails().update(3, {policy_id : "update1"})
// .then(doc => {
//     console.log(doc);
// }).catch(error => {
//     console.log(error);
// });