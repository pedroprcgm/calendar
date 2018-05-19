const jwt = require('../middlewares/jwt'),
    { Router} = require('express'),
    event = require('./event'),
    user = require('./user'),
    auth = require('./auth');
    
module.exports = (app) => {

    const router = Router();
    
    router.use('/auth', auth);
    router.use('/user', jwt.checkToken, user);
    router.use('/event', jwt.checkToken, event);

    return router;
};