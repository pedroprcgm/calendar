const config = {
    dev: {
        envDevelopment: {
            PORT: 3000,
            db: {
                host: 'localhost',
                user: 'root',
                password: 'password',
                database: 'database'
            }
        }
    },
    production: {
        PORT: 80,
        db: {
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'database',
        }
    }
};

module.exports = config;