const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArchiveSchema = new Schema({
    year: Number,
    month: Number,
    status: Number
});

module.exports = mongoose.model('Archive', ArchiveSchema);