const { Router } = require('express'),
    jwt = require('../infra/jwt');

const router = Router();

router.post('/', (req, res, next) => {
    jwt.signIn(req.body)
    .then( success => {
        res.send(success);
    }, err => {
        res.sendStatus(500).send(err);
    })
});


module.exports = router