'use strict';

let PA_GET_POLICY   = { $id : "/PaGetPolicy", type : "object", properties : {
    categoryId      :   { type : "integer"},
    userId          :   { type : "integer"},
    recharge_number :   { type : "integer"},
    amount          :   { type : "number"},
    product_id      :   { type : "integer"}
},
required : ["categoryId", "userId"]
};


let PA_CONFIRM_POLICY   = { $id : "/PaConfirmPolicy", type : "object", properties : {
    categoryId      :   { type : "integer"},
    userId          :   { type : "integer"},
    recharge_number :   { type : "integer"},
    amount          :   { type : "number"},
    product_id      :   { type : "integer"}
},
required : ["categoryId", "userId"]
};

module.exports = {
    PA_GET_POLICY,
    PA_CONFIRM_POLICY
}