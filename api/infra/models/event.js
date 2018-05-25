
module.exports = function (sequelize, DataTypes) {
    const Event = sequelize.define('event', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false
        },      
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }          
    }, {
        freezeTableName: true,
        timestamps: false
    });

    Event.associate = (models) => {
        Event.belongsTo(models.user, {as: 'author'});
    };

    return Event;
}
