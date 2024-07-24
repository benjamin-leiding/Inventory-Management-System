const mongoose = require("mongoose");
const bcrypt = require("bcrypt");



const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "The item name is required"],
    },
    ownerId: {
        type: String,
        required: [true, "The OwnerId is required"],
    },
    description: {
        type: String,
        required: [true, "The item description is required"],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

module.exports = mongoose.model("project", projectSchema);