const chai = require('chai'),
    assert = chai.assert,
    { comparePassword } = require('../infra/encryption'),
    jwt = require('../infra/jwt'),
    errorHandler = require('../infra/util/error-handler');

const user = {};

const _addUser = (model, user) => {
    return new Promise((resolve, reject) => {
        model.create(user)
            .then(added => {
                resolve(added)
            })
            .catch(err => {
                reject(err);
            });
    });
};

const _validateFields = user => {

    // assert.isNotEmpty(user.name);
    // assert.isNotEmpty(user.email);
    // assert.isNotEmpty(user.password);    

    return true;
};

const _validatePassword = (password, encrypted) => {
    return comparePassword(password, encrypted);
};

user.add = (models, user) => {
    return new Promise((resolve, reject) => {
        const _valid = _validateFields(user);
        if (!_valid) {
            reject(errorHandler.badRequest(err));
        }

        _addUser(models.user, user)
            .then(
                success => resolve(success),
                err => { reject(errorHandler.internalServerError(err)) });
    });
};

user.validate = (models, user) => {
    return new Promise((resolve, reject) => {
        models.user.findOne({ where: { email: user.email } })
            .then(userData => {
                if (!_validatePassword(user.password, userData.password)) {
                    reject(errorHandler.unauthorized());
                }
                resolve(userData);
            })
            .catch(err => {
                reject(errorHandler.internalServerError(err));
            });
    });
};

module.exports = user;