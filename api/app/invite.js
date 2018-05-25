const errorHandler = require('../infra/util/error-handler'),
    event = require('./event');

const invite = {};

const _validateFields = invite => {
    if (!invite.eventId || invite.eventId === '') return false;
    if (!invite.invitedId || invite.invitedId === '') return false;
    return true;
};

const _validateAuthor = async (models, inv) => {

    const isAuthor = await event.get(models, inv.eventId)
        .then(eve => {
            return eve.authorId === inv.authorId;
        })
        .catch(err => {
            return errorHandler.internalServerError(err)
        });
    return isAuthor === true;
};

const _get = async (model, id) => {
    const invite = await model.findOne({ where: { id: id, isDeleted: false } })
        .then(invite => {
            return invite;
        })
        .catch(err => { 
            return errorHandler.internalServerError(err);
         });
    return invite;
};


invite.add = (models, invite) => {
    return new Promise(async (resolve, reject) => {
        const _valid = _validateFields(invite);
        const _isAuthor = await _validateAuthor(models, invite);

        if (!_valid) {
            reject(errorHandler.badRequest());
            return;
        }
        if(!_isAuthor) {
            reject(errorHandler.unauthorized());
            return;
        }

        models.invite.create(invite)
            .then(added => {
                resolve(added)
            })
            .catch(err => {
                reject(errorHandler.internalServerError(err));
            });
    });
};

invite.update = (models, inviteAnswer, inviteId, userId) => {
    return new Promise(async (resolve, reject) => {
        
        // Get invite
        const _inviteData = await _get(models.invite, inviteId)
            .then(inv => {
                if(inv === null) return errorHandler.badRequest();
                return inv;
            })
            .catch(err => {
                console.log(2)
                return errorHandler.internalServerError(err)
            });

        if (_inviteData.err) {
            reject(inviteData)
            return;
        }

        // Get event of invite
        const _eventData = await event.get(models, inviteData.eventId)
            .then(e => {
                if(e === null) return errorHandler.internalServerError();
                return e;
            })
            .catch(err => {
                return errorHandler.internalServerError(err)
            });

        if (_eventData.err) {
            reject(_eventData)
            return;
        }

        // Check conflicts
        const _conflicts = await event.getEventConflicts(models, userId, _eventData)
            .then(e => {
                return e;
            })
            .catch(err => {
                return errorHandler.internalServerError(err)
            });
            
        if(_conflicts && _conflicts.length > 0) {
            reject(errorHandler.badRequest('TimeConflict'))   
            return;
        } 

        // if all ok, update
        models.invite.update({ isAccepted: inviteAnswer }, { where: { id: id } })
            .then(async result => {                
                resolve();
            })
            .catch(err => reject(errorHandler.internalServerError(err)));
    });
};

module.exports = invite;