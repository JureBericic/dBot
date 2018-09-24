'use strict';

const Ajv = require('ajv');
const fs = require('fs');

class ConfigurationManager {
    constructor(configurationPath) {
        // Read file
        const configuration = fs.readFileSync(configurationPath);
        const configurationObject = JSON.parse(configuration);

        let validationErrors = validateConfiguration(configurationObject);
        if (validationErrors) {
            throw new Error(`Configuration "${configurationPath}" could not be read: configuration is not valid${validationErrors}`);
        }

        // Initialize
        this._botToken = configurationObject.botToken;
        this._clientId = configurationObject.clientId;
        if (!configurationObject.callSign || configurationObject.callSign === '@mention') {
            this._callSign = `<@${this._clientId}>`;
        } else {
            this._callSign = configurationObject.callSign;
        }
        if (!configurationObject.loadOnStart) {
            this._loadOnStart = [];
        } else {
            this._loadOnStart = configurationObject.loadOnStart;
        }
        if (!configurationObject.admins) {
            this._admins = [];
        } else {
            this._admins = configurationObject.admins;
        }
    }

    // Getters
    get botToken() {
        return this._botToken;
    }

    get clientId() {
        return this._clientId;
    }

    get callSign() {
        return this._callSign;
    }

    get loadOnStart() {
        return this._loadOnStart;
    }

    get admins() {
        return this._admins;
    }
}

function validateConfiguration(configuration) {
    let ajv = new Ajv({"allErrors": true});
    let schema = require('../schemas/bot-configuration-schema.json');
    let validate = ajv.compile(schema);
    let valid = validate(configuration);

    let validationErrors = '';
    if (!valid) {
        for (let validationError of validate.errors) {
            validationErrors = validationErrors.concat(`\n - ${validationError.schemaPath}: ${validationError.message}`);
        }
    }
    
    return validationErrors;
}

module.exports = ConfigurationManager;
