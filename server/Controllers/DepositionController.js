const User = require("../Models/UserModel");
const Item = require("../Models/ItemModel");
const Shelf = require("../Models/ShelfModel");
const Deposition = require("../Models/DepositionModel")
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');

module.exports.CreateDeposition = async (req, res, next) => {

    try {

        const { itemId, shelfId } = req.body;

        if(!itemId){
            return res.json({ message: "ItemId was not provided", success: false });
        }

        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(201).json({ message: "Invalid itemId", success: false });
        }

        const item = await Item.findById(itemId);

        if (!item) {
            return res.status(201).json({ message: "Item not found", success: false });
        }

        if(!shelfId){
            return res.json({ message: "ShelfId was not provided", success: false });
        }

        //if (!mongoose.Types.ObjectId.isValid(shelfId)) {
        //    return res.status(201).json({ message: "Invalid shelfId", success: false });
        //}

        const shelf = await Shelf.findById(shelfId);

        if (!shelf) {
            return res.status(201).json({ message: "Shelf not found", success: false });
        }

        const depositionExist = await Deposition.findOne({itemId})
        if(depositionExist){
            await Deposition.findOneAndDelete({itemId})
            const deposition = await Deposition.create({ itemId, shelfId });
            return res
                .status(201)
                .json({ message: "deposition was being updated", success: true, deposition : deposition });
        }

        const deposition = await Deposition.create({ itemId, shelfId });
        return res
            .status(201)
            .json({ message: "deposition was being created", success: true, deposition : deposition });

        next();

    } catch (error) {

        console.error(error);

    }

};

