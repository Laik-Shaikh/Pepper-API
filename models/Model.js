const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    header: {
        type: String
    },

    image: {
        type: String
    },

    count: {
        type: Number
    }
});

const Model = mongoose.model("models", modelSchema);
module.exports = Model;