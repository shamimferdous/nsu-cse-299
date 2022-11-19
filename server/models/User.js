const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    name: {
        type: String,
        required: true,
        max: 50
    },

    email: {
        type: String,
        required: false,
    },

    facial_id: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});




UserSchema.methods.isAdmin = function () {
    return (this.role === "admin");
};



//exporting user model
module.exports = mongoose.model('users', UserSchema); 1