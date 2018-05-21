const { Router } = require('express'),
    router = Router(),
    event = require('../app/event');


const _validateFields = (event) => {
    
};

/**
 * @param {Object} Body req.body
 * @desc Create an event
 * @return Ok - Status 200 - Event after added
 * @return Error - Status 500
 */
router.post('/', (req, res, next) => {

    const userId = req.decode.id;
    const eventData = Object.assign({}, req.body, {authorId: userId});

    event.add(req.models, eventData)
        .then(success => {
            res.send(success);
        })
        .catch(err => {
            if (err.code === 400) res.boom.badRequest(err.msg);
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
    event.update(req.models, req.body, req.params.id, req.decode.id)
        .then( event => res.send(event))
        .catch( err => { 
            if (err.code === 403) res.boom.forbidden(err.msg);
            else res.boom.badImplementation(err.err);
        })
});

/** ### TODO -> events by user
 * @desc Get all event
 * @return Ok - Status 200 - List of events
 * @return Error - Status 500
 */
router.get('/', (req, res, next) => {

});

/**
 * @param {String} Id User ID
 * @param {Object} Body req.body
 * @desc Delete event
 * @return Ok - Status 200 - User after add
 * @return Error - Status 500
 */
router.delete('/:id', (req, res, next) => {
    event.delete(req.models, req.params.id, req.decode.id)
        .then( () => res.sendStatus(204))
        .catch( err => {
            if (err.code === 400) res.boom.badRequest(err.msg);
            else if (err.code === 403) res.boom.forbidden(err.msg);
            else res.boom.badImplementation(err.err);
        });
});

module.exports = router;