var mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String
    },
    begin_date: {
        type: Date
    },
    manager: {
        type: String
    },
    end_date: {
        type: Date
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Project', ProjectSchema)
