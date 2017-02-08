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

const stream = client.stream('statuses/filter', {track: '@uswan2_'});
stream.on('data', (e) => {
    const screenName = e.user.screen_name;
    const tweetId = e.id_str;
    const text = e.text;
    // 門限への問い合わせ
    if(/門限通知開始/.test(text)) {
        const curfew = new Curfew({
            screen_name: screenName,
            reacted_at: moment().format('YYYY-MM-DD')
        });
        curfew.save((err) => {
            if(err) {
            } else {
                client.post('statuses/update', {
                    status: `@${screenName} 門限通知をONにしました！`
                }, (err, tweet, res) => {
                });
            }
        });
    } else if(/門限通知停止/.test(text)) {
        Curfew
            .remove({
                screen_name: screenName
            }, (err) => {
                if(err) {

                } else {
                    client.post('statuses/update', {
                        status: `@${screenName} 門限通知をOFFにしました！`
                    }, (err, tweet, res) => {

                    });
                }
            });
    } else if(/献立通知/.test(test)) {

    }
});

console.log('server starting!')

stream.on('error', (err) => {

});

const curfew = () => {
    const genStatus = (screenName) => {
        return `@${screenName} 門限を確認しましたか？\n\n※いいねすると今日はもう通知しません\n`
    }
    const job = new cronJob({
        // cronTime: '00 00 55 15,17,19,21 * * *',
        cronTime: '00 00 07 02 * * *',
        onTick: () => {
            const h = new Date().getHours();
            if(false && h < 16) {
                // @15:55
                Curfew
                    .find()
                    .select({
                        screen_name: 1
                    })
                    .exec((err, users) => {
                        console.log('ツイートするよ！')
                        async.each(users, (user, next) => {
                            // ツイートする
                            client.post('statuses/update', {
                                status: `@${user.screen_name} 文言・・・`
                            }, (err, tweet, res) => {
                                if(err) {
                                    console.log('ツイートでエラー！')
                                }
                                else {
                                    const id = tweet.id_str;
                                    // 情報をログに格納
                                    const memory = new _Memory({
                                        screen_name: user.screen_name,
                                        tweet_id: [id]
                                    });
                                    memory.save((err) => {
                                        if(err) {
                                            console.log('データベースでエラー！')
                                        }
                                        console.log('データベース登録したよ！')
                                    });
                                }
                            });
                        });
                    });
            } else if(h > 20) {
                // @21:55
                // メモリーのドキュメントを全消去
                _Memory
                    .remove({}, (err) => {

                    });
            } else {
                // @17:55 and 19:55
                // メモリーといいねを参照し再通知
                _Memory
                    .find()
                    .exec((err, users) => {
                        async.each(users, (user, next) => {
                            let favorited = false;
                            async.each(user.tweet_id, (id, callback) => {
                                if(!favorited) {
                                    client.get(`statuses/show/${id}`, (err, tweet, res) => {
                                        if(err) {
                                            console.log('ツイート取得できなかった！')
                                        } else {
                                            const isFav = tweet.favorite_count > 0;
                                            if(isFav) {
                                                console.log('ファぼされてなかった！')
                                                // いいねがあったら以降の通知を停止
                                                favorited = true;
                                                Curfew
                                                    .update({
                                                        screen_name: user.screen_name
                                                    }, {
                                                        reacted_at: moment().format('YYYY-MM-DD')
                                                    }, (err) => {
                                                        console.log('データベース更新できなかった！')
                                                    });
                                                    console.log('データベース更新！')
                                                _Memory.remove({
                                                    screen_name: user.screen_name
                                                }, (err) => {

                                                });
                                            }
                                            callback();
                                        }
                                    });
                                } else {
                                    callback();
                                }
                            }, (err) => {
                                if(err) {

                                } else {
                                    if(favorited) {
                                        next();
                                    } else {
                                        // 再通知
                                        client.post('statuses/update', {
                                            status: `@${user.screen_name} 文言`
                                        }, (err, tweet, res) => {
                                            _Memory
                                                .update({
                                                    screen_name: user.screen_name
                                                }, {
                                                    $set: {
                                                        tweet_id: user.tweet_id.push(tweet.id_str)
                                                    }
                                                }, (err) => {
                                                    if(err) {

                                                    } else {
                                                        console.log('最後に通知したよ！')
                                                        next();
                                                    }
                                                });
                                        });
                                    }
                                }
                            });
                        });
                    });
            }
        },
        start: true
    });
}

curfew();

module.exports = {
    start: () => {
        curfew();
    }
}