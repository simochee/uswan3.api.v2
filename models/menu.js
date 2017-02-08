const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
    date: {
        year: Number,
        month: Number,
        date: Number
    },
    breakfast: {
        jap: String,
        wes: String,
        side: [String]
    },
    lunch: {
        main: String,
        side: [String]
    },
    dinner: {
        a: String,
        b: String,
        side: [String]
    }
});

module.exports = mongoose.model('Menu', MenuSchema);