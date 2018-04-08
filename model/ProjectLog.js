var mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ProjectLogSchema = new Schema({
    project_id: {
        type: String
    },
    status: {
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

module.exports = mongoose.model('ProjectLog', ProjectLogSchema)
