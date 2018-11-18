'use strict';

const fs = require('fs');

class JsonPersistanceService {
    constructor(iocRegistry) {}

    persist(key, item) {
        if (key == null || key == '') {
            throw new Error(`Cannot persist: no or empty key provided.`);
        }
        if (item == null) {
            throw new Error(`Cannot persist "${key}": no item provided.`);
        }

        const jsonString = JSON.stringify(item);
        fs.writeFileSync(`./data/${key}.json`, jsonString);
    }

    retrieve(key) {
        if (key == null || key == '') {
            throw new Error(`Cannot retrieve: no or empty key provided.`);
        }

        if (!fs.existsSync(`./data/${key}.json`)) {
            throw new Error(`Cannot retrieve "${key}": no such entry exists.`);
        }

        const jsonString = fs.readFileSync(`./data/${key}.json`);
        const item = JSON.parse(jsonString)

        return item;
    }

    delete(key) {
        if (key == null || key == '') {
            throw new Error(`Cannot delete: no or empty key provided.`);
        }

        if (!fs.existsSync(`./data/${key}.json`)) {
            throw new Error(`Cannot delete "${key}": no such entry exists.`);
        }

        fs.unlinkSync(`./data/${key}.json`);
    }
}

module.exports = JsonPersistanceService;
