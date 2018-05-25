const { Router } = require('express'),
    router = Router(),
    invite = require('../app/invite');

/**
 * @param {Object} Body req.body
 * @desc Create an invite
 * @return Ok - Status 201 
 * @return Error - Status 500
 */
router.post('/', (req, res, next) => {

    const userId = req.decode.id;
    const inviteData = Object.assign({}, req.body, { authorId: userId });

    invite.add(req.models, inviteData)
        .then(success => {
            res.sendStatus(204);
        })
        .catch(err => {
            if (err.code === 400) res.boom.badRequest(err.msg);
            if (err.code === 401) res.boom.unauthorized(err.msg);
            else res.boom.badImplementation(err.err);
        });
});

/**
 * @param {String} Id Event ID
 * @param {Object} Body req.body
 * @desc Update event
 * @return Ok - Status 200 - Event after update
 * @return Error - Status 500
 */
router.put('/:id', (req, res, next) => {
    
    invite.update(req.models, req.body, req.params.id, req.decode.id)
        .then(event => res.send(event))
        .catch(err => {
            if (err.code === 403) res.boom.forbidden(err.msg);
            else res.boom.badImplementation(err.err);
        })
});


module.exports = router;