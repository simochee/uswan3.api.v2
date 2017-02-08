const Twitter = require('twitter');

const Public = new Twitter({

});
const Feedback = new Twitter({
    consumer_key: 'Ntf4PJF8pTpJ8QDoO7gU7PAc7',
    consumer_secret: 'HpgWLOJ0i0erUSgkeKzJ9ZaAaExXeBu9IyyMXyVIbnNAHO13rV',
    access_token_key: '826786795782156289-gsxfPD96NAgcIXis4EKJJiXcDWyConM',
    access_token_secret: 't6aZiweBQye4rxgY8ed9XjuIhiVmbmXc0XxnV4br3rays'
});

const u = require('./utils');

module.exports = {
    public: {
        tweet: (body, callback, res) => {
            Feedback.post('statuses/update', {
               status: body 
            }, (error, tweet, response) => {
                if(callback === null) {
                    if(err) {
                        u.res.error(res, err);
                    } else {
                        u.res.success(res);
                    }
                } else {
                    if(typeof(callback) === 'function') {
                        callback();
                    }
                }
            });
        }
    },
    feedback: {
        tweet: (body, callback, res) => {
            Feedback.post('statuses/update', {
                status: body
            }, (error, tweet, response) => {
                if(callback === null) {
                    if(error) {
                        u.res.error(res, error);
                    } else {
                        u.res.success(res);
                    }
                } else {
                    if(typeof(callback) === 'function') {
                        callback();
                    }
                }
            });
        }
    }
}