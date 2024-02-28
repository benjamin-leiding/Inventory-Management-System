const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "The room name is required"],
    },
    floor: {
        type: Number,
        required: [true, "The floor is required"],
        
    },
    buildingId: {
        type: String,
        required: [true, "The BuildingId is required"],
    },

});

module.exports = mongoose.model("room", roomSchema);