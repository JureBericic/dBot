'use strict';

const fs = require('fs');
const path = require('path');

class ConfigurationManager {
    constructor(configurationPath) {
        // Read file.

        this._botToken = '';
        this._clientId = '';
    }

    get botToken() {
        return this._botToken;
    }

    get clientId() {
        return this._clientId;
    }
}