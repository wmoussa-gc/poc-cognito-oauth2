const { CognitoIdentityProviderClient, CreateUserPoolClientCommand } = require("@aws-sdk/client-cognito-identity-provider");
const { v4: uuidv4 } = require('uuid');
const { Issuer } = require('openid-client');
const { CognitoJwtVerifier } = require('aws-jwt-verify');
const fs = require('node:fs');

async function createAppClient() {
    const client = new CognitoIdentityProviderClient({
        region: process.env.AWS_COGNITO_REGION,
    });
    const createUserPoolClientCommand = new CreateUserPoolClientCommand({
        ClientName: uuidv4(),
        UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
        ExplicitAuthFlows: ['ALLOW_REFRESH_TOKEN_AUTH', 'ALLOW_USER_SRP_AUTH'],
        GenerateSecret: true,
        AllowedOAuthFlows: ['client_credentials'],
        SupportedIdentityProviders: ['COGNITO'],
        AllowedOAuthScopes: ['forms/read'],
        AllowedOAuthFlowsUserPoolClient: true,
        CallbackURLs: ['https://example.com'],
    });
    const { UserPoolClient } = await client.send(createUserPoolClientCommand);
    const { ClientId, ClientSecret } = UserPoolClient;
    const { privateKey, publicKey } = generateKeyPair();
    fs.writeFile('client_public_key.pem', publicKey, err => {
        if (err) {
            console.error(err);
        } else {
            // file written successfully
        }
    });

    fs.writeFile('client_secret_store.json', JSON.stringify({ ClientId, ClientSecret, privateKey }), err => {
        if (err) {
            console.error(err);
        } else {
            // file written successfully
        }
    });

    return { ClientId, ClientSecret, privateKey, publicKey };
}

async function getAccessToken(token, clientId) {
    const jwt = require('jsonwebtoken');

    console.log("TODO retrieve public key and secret for client id: ", clientId);
    const cert = fs.readFileSync("./client_public_key.pem", { encoding: "utf8" });
    const user = jwt.verify(token, cert);
    if (user.iss !== clientId) return { statusCode: 401, response: "Unauthorized" };
    const clientSecret = user.sub;

    return internal_getAccessToken(clientId, clientSecret);
}

async function internal_getAccessToken(clientId, clientSecret) {
    const issuer = new Issuer({ "token_endpoint": process.env.AWS_COGNITO_DOMAIN + "/oauth2/token" });

    const client = new issuer.Client({
        client_id: clientId,
        client_secret: clientSecret,
    });

    const tokenSet = await client.grant({
        grant_type: 'client_credentials',
        scope: 'forms/read'
    });
    return { statusCode: 200, response: tokenSet };
}

function generateKeyPair() {
    const { generateKeyPairSync } = require('crypto');
    const { privateKey, publicKey } = generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
        }
    });
    return { privateKey, publicKey };
}

async function verify(bearerToken, clientId) {
    console.log("verifying")

    const verifier = CognitoJwtVerifier.create({
        userPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
        tokenUse: "access",
        clientId: clientId,
    });
    try {
        const payload = await verifier.verify(
            bearerToken
        );
        console.log("Token is valid. Payload:", payload);
        return false;
    } catch {
        console.log("Token not valid!");
        return true;
    }
}

module.exports = {
    createAppClient,
    getAccessToken,
    verify
}