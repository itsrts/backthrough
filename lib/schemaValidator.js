'use strict';

let AJV         = require('ajv');

function schemaValidator() {
    this.ajv            = new AJV({ coerceTypes: true });
}

schemaValidator.prototype.validate = function(data, schema) {

    let result = this.ajv.validate(schema, data);

    if(!result) {
        let message = this.ajv.errorsText().replace(/'/g, "").replace("data ", "");
        return {valid : false, error : message};
    } else {
        return {valid : true, error : "No errors"};
    }
}

module.exports = new schemaValidator();