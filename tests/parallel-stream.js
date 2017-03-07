const Twitter = require('twitter');

const client = new Twitter({
    consumer_key: 'Ntf4PJF8pTpJ8QDoO7gU7PAc7',
    consumer_secret: 'HpgWLOJ0i0erUSgkeKzJ9ZaAaExXeBu9IyyMXyVIbnNAHO13rV',
    access_token_key: '826786795782156289-gsxfPD96NAgcIXis4EKJJiXcDWyConM',
    access_token_secret: 't6aZiweBQye4rxgY8ed9XjuIhiVmbmXc0XxnV4br3rays'
});

const filter = client.stream('statuses/filter', {track: '@uswan_feedback'});
filter.on('data', (e) => {
    console.log(e)
    console.log('get reply');
});
filter.on('error', (err) => {
    console.log(err);
});

const user = client.stream('user');
user.on('favorite', (e) => {
    console.log('favorited!');
});
user.on('unfavorite', (e) => {
    console.log('unfavorited!');
});
user.on('error', (err) => {
    console.log(err);
});

console.log('service running!')