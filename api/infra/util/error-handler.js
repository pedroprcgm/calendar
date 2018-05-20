
const error = {};

error.unauthorized = (err) => {
    return {
        code: 401,
        err: err,
        msg: 'Invalid credentials'
    }
};

error.badRequest = (err) => {
    return {
        code: 400,
        err: err,
        msg: 'Validation problems. Check fields.'
    }
};

error.internalServerError = (err) => {
    return {
        code: 500,
        err: err,
        msg: 'Internal server error.'
    }
};

module.exports = error;