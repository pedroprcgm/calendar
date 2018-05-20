const { Router } = require('express'),
    router = Router(),
    user = require('../app/user');

router.get('/', (req, res, next) => {    
    res.send('Hello World');
});

router.post('/', (req, res, next) => {
    user
});

module.exports = router;