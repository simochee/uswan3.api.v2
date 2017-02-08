const passwordHash = require('password-hash');

const Master = require('../models/master');

module.exports = {
    auth: (password, userName) => {
        console.log('auth', password, userName)
        return new Promise((resolve, reject) => {
            if(!password || !userName) {
                reject();
            } else {
                Master
                    .findOne({
                        name: userName
                    })
                    .exec((err, doc) => {
                        if(err || !doc) {
                            reject();
                        }
                        if(passwordHash.verify(password, doc.password) || !doc.password) {
                            resolve();
                        } else {
                            reject();
                        }
                    });
            }
        });
    },
    update: (password, name, newPassword, newName) => {
        const hashedPassword = passwordHash.generate(newPassword);
        Master
            .update({
                name
            }, {
                $set: {
                    name: newName,
                    password: hashedPassword
                }
            }, (err) => {
                if(err) {
                    return false;
                } else {
                    return true;
                }
            });
    }
}