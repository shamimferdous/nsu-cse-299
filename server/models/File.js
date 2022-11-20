const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({

    name: {
        type: String,
        required: true,
    },

    mime_type: {
        type: String,
        required: false,
    },

    drive_id: {
        type: String,
        required: true
    },

    size: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }

}, {
    timestamps: true
});



//exporting user model
module.exports = mongoose.model('files', FileSchema); 1