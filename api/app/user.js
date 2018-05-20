const chai = require('chai'),
    assert = chai.assert,
    { comparePassword } = require('../infra/encryption'),
    jwt = require('../infra/jwt');

const user = {};

const _addUser = (model, user) => {
    return new Promise((resolve, reject) => {
        model.create(user)
            .then(added => {
                resolve(added)
            }, err => {
                console.log(err); // TODO: implement error log
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
        try {
            const _valid = _validateFields(user);
            if (!_valid) {
                throw Error({ code: 400, err: 'Validation problems', msg: 'Validation problems. Check the fields.' });
            }

            _addUser(models.user, user)
                .then(
                    success => resolve(success),
                    err => { throw Error({ code: 500, err: err }) }); // TODO: implement error log

        } catch (err) {
            reject(err);
        }
    });
};

user.validate = (models, user) => {
    return new Promise((resolve, reject) => {
        try {
            models.user.findOne({ where: { email: user.email } })
                .then(userData => {

                    if (!_validatePassword(user.password, userData.password)) {
                        throw Error({ code: 400, err: 'Invalid credentials', msg: 'Invalid credentials' });
                    }

                    resolve(userData);

                }, err => {
                    throw Error({ code: 500, err: '', msg: '' }); // TODO: implement error log 
                });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = user;