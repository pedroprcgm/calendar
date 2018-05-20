const database = require('../infra/database')();

module.exports = (req, res, next) => {
    req.models = database.models;
    next();
};