const AwsConfig = require('../helpers/AwsConfig');

function createAppClient() {
    return new Promise((resolve) => {
        AwsConfig.createAppClient().then((result) => {
            return resolve(result);
        }).catch((err) => {
            console.log(err);
            return resolve({ statusCode: 500, response: err });
        });
    });
}

function getAccessToken(token, clientId) {
    return new Promise((resolve) => {
        AwsConfig.getAccessToken(token, clientId).then((result) => {
            return resolve({ statusCode: 200, response: result });
        }).catch((err) => {
            console.log(err);
            return resolve({ statusCode: 500, response: err });
        });
    });
}

function verify(token, clientId) {
    return new Promise((resolve) => {
        AwsConfig.verify(token, clientId).then((result) => {
            return resolve({ statusCode: 200, response: result });
        }).catch((err) => {
            console.log(err);
            return resolve({ statusCode: 500, response: err });
        });
    });
}

module.exports = {
    createAppClient,
    getAccessToken,
    verify
}