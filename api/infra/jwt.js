const jwt = require('jsonwebtoken');

module.exports = {
    signIn: (data) => {
        return new Promise( (resolve, reject) => { 
            jwt.sign(data, process.env.SECRET, { expiresIn: '1h' }, (err, result) => {
                if(err) reject(err);
                else resolve(result)
            });
        });
    },

    verify: (token) => {
        return new Promise( (resolve, reject) => { 
            jwt.verify(token, process.env.SECRET, (err, result) => {
                if(err) reject(err);
                else resolve(result)
            });
        });
    },

    decode: (token) => {
        return new Promise( (resolve, reject) => { 
            jwt.verify(token, (err, result) => {
                if(err) reject(err);
                else resolve(result)
            });
        });
    }
};