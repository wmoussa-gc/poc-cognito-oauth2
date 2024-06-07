const clientSecretStore = require('./client_secret_store.json');
const crypto = require('crypto');
const jose = require('jose');
const axios = require('axios');

const main = async () => {
    try {
        const alg = "RS256";
        const privateKey = crypto.createPrivateKey({ key: clientSecretStore.privateKey });
        const clientId = clientSecretStore.ClientId;
        const clientSecret = clientSecretStore.ClientSecret;

        const jwt = await new jose.SignJWT({ id: 'KID_12345' })
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setIssuer(clientId)
            .setSubject(clientSecret)
            .setExpirationTime("1h")
            .sign(privateKey);

        const { data } = await axios
            .post(
                'http://localhost:3000/api/getaccesstoken',
                { clientId: clientId },
                { headers: { Authorization: `Bearer ${jwt}` } }
            )
            .catch((e) => {
                console.error(e);
            });

        const bearerToken = data.response.response.access_token;
        await getProtectedResponse(bearerToken, clientId);

    } catch (e) {
        console.log(e);
    }
};

async function getProtectedResponse(bearerToken, clientId) {
    let config = {
        headers: { 'Authorization': `Bearer ${bearerToken}` },
        params: {
            clientId: clientId
        },
    }

    const response = await axios
        .get(
            'http://localhost:3000/api/protected',
            config
        )
        .catch((e) => {
            console.error(e.message);
        });

    console.log(response.data);
}

main();