var mongoose = require('mongoose')

const Schema = mongoose.Schema;

const TaskLogSchema = new Schema({
    task_id: {
        type: String
    },
    category: {
        type: String
    },
    log_desc: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('TaskLog', TaskLogSchema)
