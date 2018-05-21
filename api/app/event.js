const { comparePassword } = require('../infra/encryption'),
    jwt = require('../infra/jwt'),
    errorHandler = require('../infra/util/error-handler');

const event = {};

const _addEvent = (model, event) => {
    return new Promise((resolve, reject) => {
        model.create(event)
            .then(added => {
                resolve(added)
            })
            .catch(err => {
                reject(err);
            });
    });
};

const _validateFields = event => {

    // TODO: validation  

    return true;
};

const _getEvent = async (model, id) => {
    const event = await model.findOne({ where: { id: id, isDeleted: false } })
        .then(event => {
            return event;
        })
        .catch(err => { throw Error(err) });
    return event;
};

event.add = (models, event) => {
    return new Promise((resolve, reject) => {
        const _valid = _validateFields(event);
        if (!_valid) {
            reject(errorHandler.badRequest(err));
        }

        _addEvent(models.event, event)
            .then(success => resolve(success))
            .catch(err => { reject(errorHandler.internalServerError(err)) })
    });
};

event.update = (models, event, id, userId) => {
    return new Promise(async (resolve, reject) => {
        
        const eventData = await _getEvent(models.event, id);        
        if (!eventData || eventData.authorId !== userId) return reject(errorHandler.forbidden());

        models.event.update(event, { where: { id: id, isDeleted: false } })
            .then(async result => {
                const event = await _getEvent(models.event, id);
                resolve(event);
            })
            .catch(err => reject(errorHandler.internalServerError(err)));
    });
};

event.delete = (models, id, userId) => {
    return new Promise( async (resolve, reject) => {

        const eventData = await _getEvent(models.event, id);
        if (!eventData || eventData.authorId !== userId) return reject(errorHandler.forbidden());

        models.event.update({ isDeleted: true }, { where: { id: id } })
            .then(resolve())
            .catch(err => reject(err));
    });
};

module.exports = event;