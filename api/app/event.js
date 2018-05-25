const errorHandler = require('../infra/util/error-handler');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const _validateFields = event => {

    if (!event.name) return false;
    if (!event.description) return false;
    if (!event.startDate) return false;
    if (!event.endDate) return false;

    return true;
};


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


const _getEvent = async (model, id) => {
    const event = await model.findOne({ where: { id: id, isDeleted: false } })
        .then(event => {
            return event;
        })
        .catch(err => {
            return errorHandler.internalServerError(err);
        });
    return event;
};


const _getByUser = async (model, userId) => {

    const events = await model.findAll({
        attributes: ['id', 'name', 'startDate', 'endDate', 'authorId'],
        where: {
            authorId: userId,
            isDeleted: false
        }
    })
        .then(eventList => {
            return eventList;
        })
        .catch(err => {
            return errorHandler.internalServerError(err)
        });

    return events;
};


const _getEventConflicts = async (model, userId, eventFilter) => {

    var _where = {
        authorId: userId,
        isDeleted: false,
        startDate: {
            [Op.between]: [eventFilter.startDate, eventFilter.endDate]
        }
    };

    if(eventFilter.id){
        _where.id = {
            [Op.ne]: eventFilter.id
        };
    }
    
    const events = await model.findAll({
        attributes: ['id', 'name', 'startDate', 'endDate', 'authorId'],
        where: _where
    })
        .then(eventList => {
            return eventList;
        })
        .catch(err => {
            return errorHandler.internalServerError(err)
        });

    return events;
};


const event = {};


event.add = (models, event) => {
    return new Promise( async(resolve, reject) => {

        // validate
        const _valid = _validateFields(event);
        if (!_valid) {
            reject(errorHandler.badRequest(err));
            return;
        }

        // check conflicts
        const _conflicts = await _getEventConflicts(models.event, event.authorId, event)
            .then( e => {
                return e;
            })
            .catch(err => {
                return errorHandler.internalServerError(err);
            })

        if(_conflicts && _conflicts.length > 0) {
            reject(errorHandler.badRequest('TimeConflict', 'TimeConflict'));
            return;
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
                if (event && event.err) return reject(event);
                resolve(event);
            })
            .catch(err => reject(errorHandler.internalServerError(err)));
    });
};


event.getByUser = (models, userId) => {
    return new Promise(async (resolve, reject) => {
        const eventList = await _getByUser(models.event, userId);
        if (eventList.err) {
            reject(eventList);
            return;
        }
        resolve(eventList);
    });
};


event.getEventConflicts = (models, userId, eventFilter) => {
    return new Promise(async (resolve, reject) => {
        const conflicts = await _getEventConflicts(models.event, userId, eventFilter);
        if (conflicts.err) {
            reject(conflicts);
            return;
        }
        resolve(conflicts);
    });
};


event.get = (models, id) => {
    return new Promise(async (resolve, reject) => {
        const eventData = await _getEvent(models.event, id);
        if (eventData && eventData.err) return reject(eventData);
        if (eventData === null) return reject(errorHandler.badRequest());
        resolve(eventData);
    });
};


event.delete = (models, id, userId) => {
    return new Promise(async (resolve, reject) => {

        const eventData = await _getEvent(models.event, id);
        if (!eventData || eventData.authorId !== userId) return reject(errorHandler.forbidden());

        models.event.update({ isDeleted: true }, { where: { id: id } })
            .then(resolve())
            .catch(err => reject(err));
    });
};


module.exports = event;