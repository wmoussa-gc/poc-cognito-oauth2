'use strict';
require('dotenv').config();
const Cognito = require('../cognito-services');

async function CreateAppClient(req, res) {
    const response = await Cognito.createAppClient();
    res.json(response)
}

async function GetAccessToken(req, res) {
    console.log(req.headers)
    const token = req.headers.authorization.split(' ')[1];
    const clientId = req.body.clientId;
    const response = await Cognito.getAccessToken(token, clientId);
    res.json(response)
}

async function Protected(req, res) {
    console.log(req.headers)
    const bearerToken = req.headers.authorization.split(' ')[1];
    const clientId = req.query.clientId;

    if (!bearerToken) {
        return res.json({ error: "Unauthorized" }, { status: 401 });
    }
    const response = await Cognito.verify(bearerToken, clientId);
    if (response) {
        return res.status(200).json(mockResponses)
    } else {
        return res.status(401).json({ error: "Unauthorized" });
    }
}

const mockResponses = [
    {
        id: "04-06-6d28",
        createdAt: "2024-06-04T18:58:13.877Z",
        answers: [
            { questionId: 1, type: "radio", questionEn: "Are you you?", questionFr: "", answer: "Yes" },
        ],
    },
    {
        id: "04-06-412e",
        createdAt: "2024-06-04T18:58:22.768Z",
        answers: [
            { questionId: 1, type: "radio", questionEn: "Are you you?", questionFr: "", answer: "No" },
        ],
    },
];

module.exports = {
    CreateAppClient, Protected, GetAccessToken
}