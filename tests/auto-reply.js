const Twitter = require('twitter');

const client = new Twitter({
	consumer_key: 'MMDCa2YgtjOIzVGgRzPm6eIuN',
	consumer_secret: 'Bw9Rh7e6o3AB8AGoOJA4Mdx5jPO3Scfv4lrR3FwTIS2AklS9EC',
	access_token_key: '730194556344369152-P97AHXV4f7cmWNp6fUdRi21x6m3rgdE',
	access_token_secret: 'gJa2yl53P93yKPNXUeL0Rd99Z3KvWvov1Vm5cfundHm4v'
});

const stream = client.stream('statuses/filter', {track: '@uswan2_'});
stream.on('data', (e) => {
    const user = e.user.screen_name;
    const id = e.id_str;
    console.log(`to #${id}`);
    client.post('statuses/update', {
        status: `@${user} このツイートをいいねしてください`,
        in_reply_to_status_id: id
    }, (err, tweet, res) => {
        if(err) throw err;
        else console.log(tweet);
    });
});

stream.on('error', (error) => {
    console.log(error);
});

console.log('stream waiting...');