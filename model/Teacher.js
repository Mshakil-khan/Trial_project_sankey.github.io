const mongoose = require("mongoose");

const TeacherSchema = mongoose.Schema({
    infor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model("teachers", TeacherSchema);