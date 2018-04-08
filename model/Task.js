var mongoose = require('mongoose')

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    author: {
        type: String
    },
    assignee: {
        type: String
    },
    project_id: {
        type: String
    },
    pub_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', TaskSchema)
