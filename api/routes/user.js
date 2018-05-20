const { Router } = require('express'),
    router = Router(),
    user = require('../app/user');

router.get('/', (req, res, next) => {
    res.send('Hello World');
});

router.put('/:id', (req, res, next) => {
    user.update(req.models, req.body, req.params.id)
        .then( user => res.send(user))
        .catch( err => res.boom.badImplementation(err.msg))
});

router.delete('/:id', (req, res, next) => {
    user.delete(req.models, req.params.id)
        .then( () => res.sendStatus(204))
        .catch( err => {
            if (err.code === 400) res.boom.badRequest(err.msg);
            else res.boom.badImplementation(err.err);
        });
});

router.post('/', (req, res, next) => {    
});

module.exports = router;