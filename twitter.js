const cronJob = require('cron').CronJob;
const async = require('async');
const moment = require('moment');
const Twitter = require('twitter');
const Curfew = require('./models/twitter_curfew');
const _Memory = require('./models/twitter_curfew_memory');
// const Favorite = require('./models/twitter_favorite');
const logger = require('./modules/logger');

// Only developing
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/uswan-api');

const client = new Twitter({
	consumer_key: 'MMDCa2YgtjOIzVGgRzPm6eIuN',
	consumer_secret: 'Bw9Rh7e6o3AB8AGoOJA4Mdx5jPO3Scfv4lrR3FwTIS2AklS9EC',
	access_token_key: '730194556344369152-P97AHXV4f7cmWNp6fUdRi21x6m3rgdE',
	access_token_secret: 'gJa2yl53P93yKPNXUeL0Rd99Z3KvWvov1Vm5cfundHm4v'
});

// リプライの受付
const reply = client.stream('statuses/filter', {track: '@uswan2_'});
reply.on('data', (e) => {
    // リプライ受け取り
    const tweet = e.text;
    // 門限確認開始
    if(/^(?=.*(門限|もんげん))(?=.*(停止|ていし|(止|と)める|やめ(る|たい)))/.test(tweet)) {

    }
    const screenName = e.user.screenName;
});

// User stream
const user = client.stream('user');
// いいねの受付
user.on('favorite', (e) => {
    const target = e.source.screen_name;
    if(target !== 'uswan2_') {
        const tweet = e.text;
        
    }
});