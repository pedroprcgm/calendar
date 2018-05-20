
const error = {};

/**
 * 
 * @param {Object | String } err
 * @desc status 401 
 */
error.unauthorized = (err) => {
    console.log(err);
    return {
        code: 401,
        err: err,
        msg: 'Invalid credentials'
    };
};

/**
 * 
 * @param {Object | String } err
 * @desc status 400
 */
error.badRequest = (err) => {
    return {
        code: 400,
        err: err,
        msg: 'Validation problems. Check fields.'
    };
};

/**
 * 
 * @param {Object | String } err
 * @desc status 500
 */
error.internalServerError = (err) => {
    return {
        code: 500,
        err: err,
        msg: 'Internal server error.'
    };
};

module.exports = error;