var mongoose = require('mongoose')

const Schema = mongoose.Schema;

const HomeSchema = new Schema({
    info: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Home', HomeSchema)
