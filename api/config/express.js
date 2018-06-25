const express = require('express'),
    app = express(),
    router = require('../routes')(),
    env = require('dotenv').config(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    modelsMw = require('../middlewares/models'),
    boom = require('express-boom');

app.use(cors({
    origin: [
        process.env.CLIENT_URL
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
    .use(bodyParser.json())
    .use(boom());

app.use('/api', modelsMw, router);

app.use('/*', (req, res, next) => { res.boom.notFound() });

module.exports = app;