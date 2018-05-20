const jwt = require('../infra/jwt');

module.exports = {
    checkToken: (req, res, next) => {
        jwt.verify(req['Authorization'])
        .then(success => {
            next();
        }, err => {
            res.sendStatus(401);
        })
    }    
};