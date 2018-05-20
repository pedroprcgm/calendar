const { Router } = require('express'),
    jwt = require('../infra/jwt'),
    user = require('../app/user'),
    router = Router();

router.post('/', (req, res, next) => {
    user.validate(req.models, req.body)
        .then(user => {
            jwt.signIn({ email: user.email, password: user.password })
                .then(token => res.send({ token: token }))
                .catch(err => {                    
                    res.boom.badImplementation(err.msg);
                });
        })
        .catch(err => {
            res.boom.unauthorized(err.msg);
        });
});

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