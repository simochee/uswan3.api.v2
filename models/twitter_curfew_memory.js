const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemorySchema = new Schema({
    screen_name: String,
    tweet_id: [String]
});

module.exports = mongoose.model('_Memory', MemorySchema);