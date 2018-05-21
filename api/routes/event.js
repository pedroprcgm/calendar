const { Router } = require('express'),
    router = Router(),
    event = require('../app/event');

/**
 * @param {Object} Body req.body
 * @desc Create an event
 * @return Ok - Status 200 - Event after added
 * @return Error - Status 500
 */
router.post('/', (req, res, next) => {

});

/**
 * @param {String} Id Event ID
 * @param {Object} Body req.body
 * @desc Update event
 * @return Ok - Status 200 - Event after update
 * @return Error - Status 500
 */
router.put('/:id', (req, res, next) => {

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
router.delete('/', (req, res, next) => {

});

module.exports = router;