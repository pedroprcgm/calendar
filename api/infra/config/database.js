const path = require('path')
const dotEnvPath = path.resolve('.env')

require('dotenv').config({ path: dotEnvPath })

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: 'localhost',
        dialect: 'mysql',
    },
    test: {
        'url': process.env.DB_URL,
        'dialect': 'mysql',
    },
    production: {
        'url': process.env.DB_URL,
        'dialect': 'mysql',
    }
};
