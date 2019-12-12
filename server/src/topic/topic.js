const modelHelper = require('../model/modelHelper');

const topicModel = {
    'title': {type: String, 'require': true},
    'desc': {type: String, 'require': true},
    'web_id': {type: String},
    'skills': {type: [], 'require': true},
    'members': {type: [], 'require': true},
    'max_team_size': {type: Number, 'require': true},
    'difficulty': {type: Number, 'require': true},
    'start_at': {type: Date, 'require': true},
    'end_at': {type: Date, 'require': true},
    'auto_group': {type: Boolean, 'require': true},
    'created_at': {type: Date, 'require': true},
    'last_modified_at': {type: Date, 'require': true}
};

module.exports = {
    model: () => modelHelper.createModel('topic', topicModel)
};
