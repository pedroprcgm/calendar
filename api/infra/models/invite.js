/*
    ###
    NOT USING ON MODELS AND MIGRATIONS
    ###
*/
module.exports = function (sequelize, DataTypes) {
    const Invite = sequelize.define('invite', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        isAccepted: {
            type: DataTypes.BOOLEAN,
            defaultValue: null
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }
    }, {
            freezeTableName: true,
            timestamps: false
        });

    Invite.associate = (models) => {
        Invite.belongsTo(models.user, { as: 'invited' });
        Invite.belongsTo(models.event, { as: 'event' });
    };

    return Invite;
}
