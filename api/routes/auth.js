const { Router } = require('express'),
    jwt = require('../infra/jwt'),
    user = require('../app/user'),
    router = Router();

/**
 * @param {Object} User {id, email, password}
 * @desc Generate token
 * @return Ok - Token
 * @return Error - Throw Error
 */
const _genToken = async (user) => {
    const token = jwt.signIn({ id: user.id, email: user.email, password: user.password })
        .then(token => { return {token: token} })
        .catch(err => { throw Error(err) });
    return token;
};

/**
 * @param {Object} Body req.body
 * @desc Validate user with password
 * @return Ok - Status 200 - Token
 * @return Error - Status 401
 * @return Error - Status 500
 */
router.post('/', (req, res, next) => {
    user.validate(req.models, req.body)
        .then( async user => {
            const token = await _genToken(user);
            res.send(token);
        })
        .catch(err => {
            res.boom.unauthorized(err.msg);
        });
});

/**
 * @param {Object} Body req.body
 * @desc Create an user
 * @return Ok - Status 200 - User after added
 * @return Error - Status 400
 * @return Error - Status 500
 */
router.post('/create', (req, res, next) => {
    user.add(req.models, req.body)
        .then(success => {
            res.send(success);
        })
        .catch(err => {
            if (err.code === 400) res.boom.badRequest(err.msg);
            else res.boom.badImplementation(err.err);
        });
});


module.exports = router