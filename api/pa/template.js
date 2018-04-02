'use strict';

let _   = require('lodash');

let PA_GET_POLICY   = function(data) {
    return {
        "id"                : 102046,
        "name"              : "Personal Accident Insurance of Rs. 1 lac for 1 year",
        "meta_title"        : "",
        "extra_description" : null,
        "meta_description"  : "",
        "meta_keyword"      : null,
        "heading"           : "",
        "ga_key"            : "",
        "canonical_url"     : "",
        "storefront_url"    : null,
        "product_list"      : [{
            "id"                : (_.get(process, 'env.NODE_ENV', 'development').toLowerCase() === 'production') ? 120690906 : 63795764,
            "attributes"        : {
                "price"             : "20"
            },
            "input_fields"      : [{
                "title"             : "Rs 1 lakh Personal Accident Insurance for 1 Year at Rs 20",
                "config_key"        : "insurance",
                "regex"             : "",
                "type"              : "checkbox",
                "read_only"         : 0,
                "pre_selected"      : false
            }],
            "conv_fee"          : false,
            "long_rich_desc"    : [{
                "title"             : "Terms & Conditions",
                "heading"           : "ICICI Lombard Personal Accident Insurance",
                "description"       : "<br>1) Policy is valid for Indian citizens who are users of the Paytm Platform and aged between 18 - 50 yrs at the time of issuance. Policy will be issued in the name of the individual as registered with Paytm. <br><br>2) This policy is offered by ICICI Lombard General Insurance Co. Ltd. and covers benefit up to Rs. 1 lakh for Accidental Death and Partial Permanent Disability for a period of 1 year. <br><br>3) Customer shall receive the policy certificate directly on his/her email id registered with Paytm within 24 hours of the transaction. The policy coverage will start from T+3 day (T is the transaction day). <br><br>4) Customers can purchase a maximum of 5 such policies. <br><br>5) For any further queries, the policy holder should reach out to ICICI Lombard General Insurance Co. Ltd. on their toll free number, official email ID or offices as mentioned in the policy document. <br><br>6) The insurance policy is a contract between ICICI Lombard General Insurance Co. Ltd. and the customer. Customer should reach out to ICICI Lombard General Insurance Co. Ltd. for any issues and claims. <br><br>7) Policy can be cancelled within 15 days from the date of purchase."
            }]
        }],
        "meta_data"         : {
            "recharge_number"   : _.get(data, 'recharge_number', ''),
            "amount"            : _.get(data, 'amount', ''),
            "productId"         : _.get(data, 'product_id', ''),
            "request_id"        : _.get(data, 'request_id', '')
        }
    };
}

module.exports = {
    PA_GET_POLICY
}