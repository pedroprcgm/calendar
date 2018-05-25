const jwt = require('../infra/jwt');

module.exports = {
    checkToken: (req, res, next) => {
        const token = req.headers['Authorization'] || req.headers['authorization'];
        jwt.verify(token)
            .then( decode => {
                req.decode = decode;
                next();
            })
            .catch( err => {
                res.boom.unauthorized();
            })
    }    
};