const Twitter = require('twitter');

const feedback = new Twitter({
    consumer_key: 'Ntf4PJF8pTpJ8QDoO7gU7PAc7',
    consumer_secret: 'HpgWLOJ0i0erUSgkeKzJ9ZaAaExXeBu9IyyMXyVIbnNAHO13rV',
    access_token_key: '826786795782156289-gsxfPD96NAgcIXis4EKJJiXcDWyConM',
    access_token_secret: 't6aZiweBQye4rxgY8ed9XjuIhiVmbmXc0XxnV4br3rays'
});

const stream = feedback.stream('user');
stream.on('favorite', (e) => {
    console.log('favorite!');
});
stream.on('follow', (e) => {
    console.log('unfavorited!');
});

stream.on('error', (err) => {
    console.log(err);
});

console.log('System listening!')

// const Stream = require('user-stream');
// const stream = new Stream({
//     consumer_key: 'Ntf4PJF8pTpJ8QDoO7gU7PAc7',
//     consumer_secret: 'HpgWLOJ0i0erUSgkeKzJ9ZaAaExXeBu9IyyMXyVIbnNAHO13rV',
//     access_token_key: '826786795782156289-gsxfPD96NAgcIXis4EKJJiXcDWyConM',
//     access_token_secret: 't6aZiweBQye4rxgY8ed9XjuIhiVmbmXc0XxnV4br3rays'
// });

// stream.stream();

// stream.on('data', (e) => {
//     console.log(e); 
// });