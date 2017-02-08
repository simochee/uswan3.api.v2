const fs = require('fs');
const async = require('async');
const moment = require('moment');
const Menu = require('../models/menu');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/uswan-api');

const year = 2016;
const month = 12;

const m = moment().set({ year: year, month: month - 1 });

const json = JSON.parse(fs.readFileSync(`./json/${m.format('YYYYMM')}.json`));

async.each(json, (item, callback) => {
    if(!item.date) callback();
    else {
        console.log(item.breakfast)
        Menu
            .update({
                date: m.set({ date: item.date }).format('YYYY-MM-DD')
            }, {
                $set: {
                    breakfast: {
                        jap: item.breakfast.jap,
                        wes: item.breakfast.wes,
                        side: item.breakfast.sides
                    },
                    lunch: {
                        main: item.lunch.main,
                        side: item.lunch.sides
                    },
                    dinner: {
                        a: item.dinner.a,
                        b: item.dinner.b,
                        side: item.dinner.sides
                    }
                }
            }, {
                upsert: true
            }, (err) => {
                console.log(m.set({ date: item.date }).format('YYYY-MM-DD'), err || 'success!');
                callback();
            });
    }
}, (err) => {
    console.log('complete!', err)
});