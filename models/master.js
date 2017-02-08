const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MasterSchema = new Schema({
    name: String,
    password: String
});

module.exports = mongoose.model('Master', MasterSchema);