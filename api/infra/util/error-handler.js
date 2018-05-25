
const error = {};

/**
 * 
 * @param {Object | String } err
 * @desc status 400
 */
error.badRequest = (err, msg) => {
    return {
        code: 400,
        err: err,
        msg: msg || 'Validation problems. Check fields.'
    };
};

/**
 * 
 * @param {Object | String } err
 * @desc status 401 
 */
error.unauthorized = (err) => {
    return {
        code: 401,
        err: err,
        msg: 'Invalid credentials.'
    };
};

/**
 * 
 * @param {Object | String } err
 * @desc status 403 
 */
error.forbidden = (err) => {
    return {
        code: 403,
        err: err,
        msg: `You don't have access for this action.`
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