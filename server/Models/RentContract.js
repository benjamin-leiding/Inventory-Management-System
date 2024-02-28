const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const rentContractSchema = new mongoose.Schema({
    itemId: {
        type: String,
        required: [true, "The itemId is required"],
    },
    rentUserId: {
        type: String,
        required: [true, "The rentUserId is required"],
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