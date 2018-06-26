'use strict';
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('user', {
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
    }, {});
    User.associate = function (models) {
        // associations can be defined here
    };
    return User;
};