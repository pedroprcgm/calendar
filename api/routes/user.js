const { Router } = require('express'),
    router = Router();

router.get('/', (req, res, next) => {
    console.log('pass token validation')
    res.send('Hello World');
});

router.post('/', (req, res, next) => {
    console.log(req.body);    
});

module.exports = router;