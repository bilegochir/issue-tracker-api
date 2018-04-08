var mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ProjectMemberSchema = new Schema({
    project_id: {
        type: String
    },
    member_id: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ProjectMember', ProjectMemberSchema)
