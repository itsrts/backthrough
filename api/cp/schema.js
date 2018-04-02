'use strict';

let CP_GET_POLICY   = { $id : "/EventsGetPolicy", type : "object", properties : {
    data    :   { type : "object", properties : {
        insurance_type   :   { type :   "array", items : { type : "integer", minItems : 1 }},
        meta_data   :   { type : "object",  properties :{
            user        :   { type : "object",  properties :{
                customer_id   :   { type : "string"},
                first_name    :   { type : "string"},
                mobile_num    :   { type : "string"},
                user_email    :   { type : "string"}
            },
            required : ["customer_id", "first_name", "mobile_num", "user_email"]
            },
            channel     :   { type : "object",  properties :{
                platform   :   { type : "string"},
                version    :   { type : "integer"}
            },
            required : ["platform", "version"]
            }
        },
        required : ["user", "channel"]
        },
        details   :   { type : "object", properties :{
            id              :   { type : "string"},
            name            :   { type : "string"},
            type            :   { type : "string"},
            delivery        :   { type : "integer", enum : [1, 0]},
            category        :   { type : "string"},
            start_date      :   { type : "string"},
            provider_name   :   { type : "string"},
            provider_id     :   { type : "integer"},
            city_name       :   { type : "string"},
            ticket_count    :   { type : "integer"},
            address         :   { type : "string"},
            vertical_id     :   { type : "integer"},
            end_date        :   { type : "string"},
            is_refundable   :   { type : "boolean"},
            dispatch_date   :   { type : "string"},
            city_id         :   { type : "integer"},
            booking_amount  :   { type : "number"},
            convenience_fee :   { type : "number"},
            tickets         :   { type :   "array", items : { type : "object", properties :{
                    ticket_id      :   { type : "string"},
                    price          :   { type : "number"},
                    number         :   { type : "string"},
                    type           :   { type : "string"},
                    class          :   { type : "string"}
            },
            required : ["ticket_id", "price" ]
            }}
        },
        if       : {
            properties : {
                delivery : { enum : [1]}
            }
        },
        then     : {
            required : ["dispatch_date"]
        },
        required : ["id", "name", "type", "delivery", "category", "start_date", "provider_name",
                    "provider_id", "city_name", "ticket_count", "address", "vertical_id", 
                    "end_date", "is_refundable", "city_id", "booking_amount"
                    ]
        }
    },
    required : ["insurance_type", "meta_data", "details"]
}},
required : ["data"]
};


let CP_CONFIRM_POLICY   = { $id : "/PaConfirmPolicy", type : "object", properties : {
    categoryId      :   { type : "integer"},
    userId          :   { type : "integer"},
    recharge_number :   { type : "integer"},
    amount          :   { type : "number"},
    product_id      :   { type : "integer"}
},
required : ["categoryId", "userId"]
};

module.exports = {
    CP_GET_POLICY,
    CP_CONFIRM_POLICY
}