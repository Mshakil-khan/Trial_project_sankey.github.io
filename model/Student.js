const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
    infor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    attemptedTests: {
        type: Array,
    },
    testStatus: {
        type: Array,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model("students", StudentSchema);