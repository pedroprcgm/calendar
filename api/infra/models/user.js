const { encryptPassword } = require('../encryption');

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('user', {
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        verificationCode: {
            type: DataTypes.STRING,
            defaultValue: 0
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }
    }, {
        hooks: {
            beforeCreate: user => {
                user.password = encryptPassword(user.password)
            }
        },
        freezeTableName: true,
        timestamps: false
    });

    return User;
}
