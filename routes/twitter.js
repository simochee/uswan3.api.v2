const cronJob = require('cron').CronJob;
const u = require('../modules/utils');
const twitter = require('../modules/twitter');

let botStatus = 'active';

const moment = require('moment');
const menu = require('./menu');
const tweet = () => {
    const m = moment();
	const hours = m.get('hour');
	const time = hours < 10 ? {
		ja: '朝', en: 'breakfast'
	} : hours < 15 ? {
		ja: '昼', en: 'lunch'
	} : {
		ja: '夕', en: 'dinner'
	};
	menu.getPart(m).then((data) => {
		if(data.status === 'success') {
            twitter.public.tweet('Message');
			// const tweet = genTweet(time.en, data.item);
			// if(tweet === null) return;
			// const status = 
			// 	tweet === '寮祭' ? `まもなく夕食の時間です！\n本日は寮祭です！` :
			// 	tweet === '高専祭' ? `まもなく昼食の時間です！\n本日は高専祭です！` :
			// 	`まもなく${time.ja}食の時間です！\n献立は ${tweet} です！\nhttp://uswan2.web.fc2.com/${time.en}`;
			// client.post('statuses/update', {
			// 	status: status
			// }, (err, tweet, res) => {
			// 	if(!err) {
			// 		console.log('Tweeted');
			// 	}
			// });
		} else {
			console.log('notfound');
		}
	}, (err) => {
		console.log('Error: ', err);
	});
}

const job = new cronJob({
	cronTime: '00 00 7,11,17 * * *',
	onTick: () => {
		tweet();
	}
});

module.exports = {
    feedback: (req, res) => {
        const body = req.body.body;
        if(body === '') {
            u.res.error('message_empty');
        } else {
            twitter.feedback.tweet(`@uswan2_ ${body}`, null, res);
        }
    },
    bot: {
        start: (req, res) => {
            if(botStatus === 'stop') {
                try {
                    job.start();
                    botStatus = 'active';
                    u.res.success(res);
                } catch (e) {
                    u.res.error(res, e);
                }
            } else {
                res.json({ status: 'no_update', message: 'Bot already started.' });
            }
        },
        stop: (req, res) => {
            if(botStatus === 'active') {
                try {
                    job.stop();
                    botStatus = 'stop';
                    u.res.success(res);
                } catch (e) {
                    u.res.error(res, e);
                }
            } else {
                res.json({ status: 'no_update', message: 'Bot already stoped.' });
            }
        },
        getStatus: (req, res) => {
            res.json({ status: botStatus });
        }
    }
}