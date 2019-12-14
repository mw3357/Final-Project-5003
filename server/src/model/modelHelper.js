const mongoose = require('../db/connection').mongoose;

module.exports = {
    createModel: function(name, model) {
        return mongoose.model(name, new mongoose.Schema(model));
    }
};
