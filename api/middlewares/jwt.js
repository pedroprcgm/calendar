const jwt = require('../infra/jwt');

module.exports = {
    checkToken: (req, res, next) => {
        jwt.verify(req.headers['Authorization'] || req.headers['authorization'])
        .then(success => {
            next();
        }, err => {
            res.sendStatus(401);
        })
    }    
};