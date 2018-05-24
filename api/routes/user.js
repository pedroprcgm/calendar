const { Router } = require('express'),
    router = Router(),
    user = require('../app/user');
 
/**
 * @param {String} Id User ID
 * @param {Object} Body req.body
 * @desc Update user
 * @return Ok - Status 200 - User after update
 * @return Error - Status 500
 */
router.put('/:id', (req, res, next) => {
    user.update(req.models, req.body, req.params.id)
        .then( user => res.send(user))
        .catch( err => res.boom.badImplementation(err.msg))
});

/** 
 * @desc Get user by Id
 * @return Ok - Status 200 - User
 * @return Error - Status 500
 * @return Error - Status 400
 */
router.get('/:id', (req, res, next) => {
    
    user.get(req.models, req.params.id)
        .then( user => res.send(user))
        .catch( err => {
            if (err.code === 400) res.boom.badRequest(err.msg);
            else res.boom.badImplementation(err.err);
        });
});

/**
 * @param {String} Id User ID
 * @desc Delete user by ID
 * @return Ok - Status 204 
 * @return Error - Status 400
 * @return Error - Status 500
 */
router.delete('/:id', (req, res, next) => {
    user.delete(req.models, req.params.id)
        .then( () => res.sendStatus(204))
        .catch( err => {
            if (err.code === 400) res.boom.badRequest(err.msg);
            else res.boom.badImplementation(err.err);
        });
});

module.exports = router;