const u = require('../modules/utils');

const Archive = require('../models/archive');

module.exports = {
    get: (req, res) => {
        Archive
            .find()
            .sort({ year: -1, month: -1 })
            .exec((err, data) => {
                if(err) {
                    u.res.error(res, err);
                } else {
                    res.json(data);
                }
            });
    },
    put: (req, res) => {
        const year = req.params.year;
        const month = req.params.month;
        const status = req.params.status;
        console.log('hp', req.params)
        const archive = new Archive({
            year,
            month,
            status
        });

        archive
            .save((err) => {
                if(err) u.res.error(res, err);
                else u.res.success(res);
            });
    }
}