const jwt = require('../infra/jwt');

module.exports = {
    checkToken: (req, res, next) => {
        console.log('token')
        jwt.verify(req['Authorization'])
        .then(success => {
            next();
        }, err => {
            res.sendStatus(401);
        })
    }    
};