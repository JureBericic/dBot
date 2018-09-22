'use strict';

const fs = require('fs');
const path = require('path');

class ConfigurationManager {
    constructor(configurationPath) {
        // Read file.
        // TODO: check file against schema
        const configuration = fs.readFileSync(configurationPath);
        const configurationObject = JSON.parse(configuration);

        this._botToken = configurationObject.botToken;
        this._clientId = configurationObject.clientId;
        this._callSign = configurationObject.callSign;
    }

    get botToken() {
        return this._botToken;
    }

    get clientId() {
        return this._clientId;
    }

    get callSign() {
        return this._callSign;
    }
}

module.exports = ConfigurationManager;
