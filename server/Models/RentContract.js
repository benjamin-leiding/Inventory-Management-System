const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const rentContractSchema = new mongoose.Schema({
    itemId: {
        type: String,
        required: [true, "The itemId is required"],
    },
    contractType: {
        type: String,
        required: [true, "The Contract type can be a user or a project"],
    },
    rentUserId: {
        type: String,
        required: [true, "The rentUserId is required, can be a user or a project"],
    },
    contractorId: {
        type: String,
        required: [true, "The contractorId is required"],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    expires: {
        type: Date,
        required: [true, "The expires is required"],
    },
});

module.exports = mongoose.model("rentContract", rentContractSchema);