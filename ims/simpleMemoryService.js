'use strict';

let InMemory    = require('../lib/inMemory');

class SimpleMemoryService {

    constructor(name) {
        this.name   = name;
        this.ims    = new InMemory();
    }

    save(order) {
        return this.ims.saveToMap(order.provider, order.id, JSON.stringify(order));
    }

    delete(provider, id) {
        return this.ims.saveToMap(provider, id, "");
    }

    get(key) {
        return this.ims.getFromMap(this.name, key);
    }
}

let sms = new SimpleMemoryService('pending');

// sms.save({
//     id : "ok",
//     title : "this is dummy",
//     provider : 1,
//     price : 100.56
// });

// sms.get("ok")
// .then(asdasd => {
//     console.log(asdasd);
// });

// sms.delete("1", "1")
sms.ims.getAll("1")
.then(asdasd => {
    console.log(asdasd);
});