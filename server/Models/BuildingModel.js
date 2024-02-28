const mongoose = require("mongoose");
const bcrypt = require("bcrypt");



const buildingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "The Building name is required"],
        unique: true,
    },
    address: {
        type: String,
        required: [true, "The Building address is required"],
    },

});

module.exports = mongoose.model("building", buildingSchema);