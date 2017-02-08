const moment = require('moment');
const u = require('../modules/utils');

const Menu = require('../models/menu');

const makePattern = (keywords) => {
    const regExp = keywords.replace(/,/g, '|');
    const pattern = new RegExp(regExp, 'g');
    return pattern;
}

const makeOpts = (args) => {
    const pattern = args.pattern;
    const field = args.field || null;
    const start = args.start || moment().format('YYYY-MM-DD');
    const end = args.end || moment(start).add(7, 'days').format('YYYY-MM-DD');
    
    const opts = {};
    // 検索期間を設定
    opts.date = {
        $gte: start,
        $lte: end
    }

    opts.$or = [];
    // 検索フィールドを設定しつつクエリを設定
    if(!field || /breakfast/.test(field)) {
        opts.$or.splice(-1, 0, {
            breakfast: { jap: pattern }
        }, {
            breakfast: { wes: pattern }
        }, {
            breakfast: { side: pattern }
        });
    }
    if(!field || /lunch/.test(field)) {
        opts.$or.splice(-1, 0, {
            lunch: { main: pattern }
        }, {
            lunch: { side: pattern }
        });
    }
    if(!field || /dinner/.test(field)) {
        opts.$or.splice(-1, 0, {
            dinner: { a: pattern }
        }, {
            dinner: { b : pattern }
        }, {
            dinner: { side: pattern }
        });
    }

    return opts;
}

module.exports = {
    // 期間を指定
    period: (req, res) => {
        const start = req.params.start;
        const end = req.params.end;
        // start and end is formatted 'YYYY-MM-DD'

        const pattern = makePattern(req.params.words);
        const opts = makeOpts({
            start,
            end,
            pattern
        });

        Menu
            .find()
            .exec((err, data) => {
                if(err) {
                    u.res.error(err);
                } else {
                    res.json(data);
                }
            });
    },
    _period: (req, res) => {
        const start = req.params.start;
        const end = req.params.end;
        // start and end is formatted 'YYYY-MM-DD'

        const pattern = makePattern(req.params.keywords);
        const opts = makeOpts({
            pattern,
            field: req.params.field,
            period: {
                start: moment(start),
                end: moment(end)
            }
        });
        Menu
            .find(opts)
            .exec((err, data) => {
                if(err) {
                    u.res.error(err);
                } else {
                    res.json(data);
                }
            });
    }
}