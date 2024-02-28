const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const depositionSchema = new mongoose.Schema({
    itemId: {
        type: String,
        required: [true, "The itemId is required"],
    },
    shelfId: {
        type: String,
        required: [true, "The shelfId is required"],
    },
});

module.exports = mongoose.model("deposition", depositionSchema);