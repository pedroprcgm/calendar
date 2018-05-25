const Sequelize = require('sequelize'),
    fs = require('fs'),
    path = require('path');

module.exports = () => {

    const sequelize = new Sequelize(process.env.DB_URL, {
        dialect: 'mysql',
        logging: false
    });

    const db = {
        sequelize,
        Sequelize,
        models: {}
    }
    const dir = path.join(__dirname, './models')
    fs.readdirSync(dir).forEach(file => {
        const modelDir = path.join(dir, file)
        const model = sequelize.import(modelDir)
        db.models[model.name] = model
    });

    Object.keys(db.models).forEach(key => {
        if ('associate' in db.models[key]) {
            db.models[key].associate(db.models)
        }
    });

    sequelize.sync();

    return db;
};