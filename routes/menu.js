const moment = require('moment');
const async = require('async');
const u = require('../modules/utils');

const Menu = require('../models/menu');

module.exports = {
    // 献立を取得
    get: (req, res) => {
        const m = moment();
        
        const delay = req.params.delay || 0;

        Menu
            .find({
                date: {
                    $gte: m.add(delay, 'days').format('YYYY-MM-DD'),
                    $lte: m.add(1, 'months').add(delay, 'days').format('YYYY-MM-DD')
                }
            })
            .sort({ date: 1 })
            .exec((err, data) => {
                if(err) {
                    u.res.error(res, err);
                } else {
                    res.json(data);
                }
            });
    },
    // 献立を追加（月を新規に登録）
    update: (req, res) => {
        const year = req.body.year;
        const month = req.body.month;
        const m = moment().set({
            year,
            month
        });
        const menu = JSON.parse(req.body.menu);
        const dayOfMonth = m.add(1, 'months').date(0).get('date');
        const days = Array.apply(null, { length: dayOfMonth }).map(Number.call, Number);
        async.each(days, (i, next) => {
            let upsert = true;
            if(menu[i] === {} || !menu[i]) {
                upsert = false;
            }
            Menu
                .update({
                    date: m.date(i + 1).format('YYYY-MM-DD')
                }, {
                    $set: menu[i]
                }, {
                    upsert
                }, (err, doc) => {
                    next();
                });
        }, (err) => {
            if(err) u.res.error(res, err);
            else u.res.success(res);
        });
    },
    getMonthly: (req, res) => {
        const year = req.params.year;
        const month = req.params.month - 1;
        const m = moment().set({
            year,
            month
        });

        Menu
            .find({
                date: {
                    $gte: m.date(1).format('YYYY-MM-DD'),
                    $lte: m.add(1, 'months').add(0).format('YYYY-MM-DD')
                }
            })
            .sort({ date: 1 })
            .exec((err, data) => {
                if(err) {
                    u.res.error(res, err);
                } else {
                    res.json(data);
                }
            });
    },
    getDaily: (m) => {
        return new Promise((resolve, reject) => {
            Menu.find({
                date: m.format('YYYY-MM-DD')
            })
            .exec((err, data) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    },
    // Jsonをデータベースに登録
    json: (req, res) => {
        const json = JSON.parse(req.body.json);
        async.each(json, (item, next) => {
            Menu
                .update({
                    date: item.date
                }, {
                    $set: json.menu
                }, {
                    upsert: true
                }, (err, doc) => {
                    next();
                });
        }, (err) => {
            if(err) u.res.error(res, err);
            else u.res.success(res);
        });
    }
}