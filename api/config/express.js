const express = require('express'),
    app = express(),
    router = require('../routes')(),
    env = require('dotenv').config(),
    cors = require('cors'),
    bodyParser = require('body-parser');

app.use(cors({
    origin: [
        process.env.CLIENT_URL
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
.use(bodyParser.json());

app.use('/api', router);

module.exports = app;