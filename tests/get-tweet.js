const Twitter = require('twitter');

const client = new Twitter({
	consumer_key: 'MMDCa2YgtjOIzVGgRzPm6eIuN',
	consumer_secret: 'Bw9Rh7e6o3AB8AGoOJA4Mdx5jPO3Scfv4lrR3FwTIS2AklS9EC',
	access_token_key: '730194556344369152-P97AHXV4f7cmWNp6fUdRi21x6m3rgdE',
	access_token_secret: 'gJa2yl53P93yKPNXUeL0Rd99Z3KvWvov1Vm5cfundHm4v'
});

const id = '828608367631298560';
client.get(`statuses/show/${id}`, (err, tweet, res) => {
    console.log(tweet.entities.user_mentions);
});

console.log('stream waiting...');