var mongoose = require('mongoose')

const Schema = mongoose.Schema;

const HelpSchema = new Schema({
    info: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Help', HelpSchema)
