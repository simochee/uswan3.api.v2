const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CurfewSchema = new Schema({
    screen_name: String,
    reacted_at: String
});

module.exports = mongoose.model('Curfew', CurfewSchema);