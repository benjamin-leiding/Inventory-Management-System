const User = require("../Models/UserModel");
const Room = require("../Models/RoomModel");
const Shelf = require("../Models/ShelfModel");
const Item = require("../Models/ItemModel");
const Project = require("../Models/ProjectModel")
const HistoryContract = require("../Models/HistoryContract");
const RentContract = require("../Models/RentContract");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

module.exports.CreateRentContract = async (req, res, next) => {

    try {

        const { itemId, contractType, rentUserId, contractorId, expires } = req.body;

        // Check if the itemId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(201).json({ message: "Invalid itemId", success: false });
        }

        // Check if item exists
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(201).json({ message: "Item not found", success: false });
        }

        // Check if rentUserId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(rentUserId)) {
            return res.status(201).json({ message: "Invalid rentUserId", success: false });
        }

        if(contractType == "User"){
            // Check if rent user exists
            const rentUser = await User.findById(rentUserId);
            if (!rentUser) {
                return res.status(201).json({ message: "Rent user not found", success: false });
            }
        }

        if(contractType == "Project"){
            // Check if rent user exists
            const rentUser = await Project.findById(rentUserId);
            if (!rentUser) {
                return res.status(201).json({ message: "Rent user not found", success: false });
            }
        }


        // Check if contractorId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(contractorId)) {
            return res.status(201).json({ message: "Invalid contractorId", success: false });
        }

        // Check if contractor exists
        const contractor = await User.findById(contractorId);
        if (!contractor) {
            return res.status(201).json({ message: "Contractor not found", success: false });
        }

        // Check expiration date
        const expiresDate = new Date(expires);
        if (isNaN(expiresDate.getTime()) || expiresDate <= Date.now() || expiresDate > Date.now() + (6 * 30 * 24 * 60 * 60 * 1000)) {
            return res.status(201).json({ message: "Invalid expiration date", success: false });
        }


        const isItemAlreadyRentedOut = await RentContract.findOne({itemId})
        if(isItemAlreadyRentedOut){
            return res
                .status(201)
                .json({ message: "Item is already rented out", success: false});
        }

        //toBeImplemented
        const ifItemHasLocationDeleteLocation = false


        const rentContract = await RentContract.create({ itemId, contractType, rentUserId, contractorId, expires });

        res
            .status(201)
            .json({ message: "RentContract was being created", success: true, rentContract : rentContract });

        next();

    } catch (error) {

        console.error(error);

    }

};

module.exports.GetAllRentContracts = async (req, res, next) => {

    try {

        const rentContracts = await RentContract.find()
        if(rentContracts){
            let results = []
            for(const index in rentContracts){


                const contractor = await User.findById(rentContracts[index].contractorId)
                const item = await Item.findById(rentContracts[index].itemId)

                if(rentContracts[index].contractType == "User"){
                    const user = await User.findById(rentContracts[index].rentUserId)

                    let result = {
                        _id : rentContracts[index]._id,
                        itemId : item._id,
                        itemName : item.name,
                        rentUserId : user._id,
                        rentUserUserName : user.username,
                        rentUserEmail: user.email,
                        contractorId : contractor._id,
                        contractorUserName : contractor.username,
                        contractorEmail : contractor.email,
                        createdAt : rentContracts[index].createdAt,
                        expires: rentContracts[index].expires
                    }
                    results.push(result)
                }
                if(rentContracts[index].contractType == "Project"){
                    const project = await Project.findById(rentContracts[index].rentUserId)
                    const owner = await User.findById(project.ownerId)

                    let result = {
                        _id : rentContracts[index]._id,
                        itemId : item._id,
                        itemName : item.name,
                        rentUserId : project._id,
                        rentUserUserName : project.name,
                        rentUserEmail: owner.email,
                        contractorId : contractor._id,
                        contractorUserName : contractor.username,
                        contractorEmail : contractor.email,
                        createdAt : rentContracts[index].createdAt,
                        expires: rentContracts[index].expires
                    }
                    results.push(result)
                }




            }

            res
                .status(201)
                .json({ message: "Here are all contracts", success: true, rentContracts: results});
        }else{

            res
                .status(201)
                .json({ message: "No contracts found", success: false });
        }

        next();

    } catch (error) {

        console.error(error);

    }

};

module.exports.GetOwnRentContracts = async (req, res, next) => {
    jwt.verify(req.headers.token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {

            return res.json({ status: false })
        } else {

            const rentUserId = data.id
            const rentContracts = await RentContract.find({rentUserId})

            if(rentContracts){
                let results = []
                for(const index in rentContracts){
                    const rentUser = await User.findById(rentContracts[index].rentUserId)
                    const contractor = await User.findById(rentContracts[index].contractorId)
                    const item = await Item.findById(rentContracts[index].itemId)
                    let result = {
                        _id : rentContracts[index]._id,
                        itemId : item._id,
                        itemName : item.name,
                        rentUserId : rentUser._id,
                        rentUserUserName : rentUser.username,
                        rentUserEmail: rentUser.email,
                        contractorId : contractor._id,
                        contractorUserName : contractor.username,
                        contractorEmail : contractor.email,
                        createdAt : rentContracts[index].createdAt,
                        expires: rentContracts[index].expires
                    }
                    results.push(result)
                }
                res
                    .status(201)
                    .json({ message: "Here are all contracts", success: true, rentContracts: results});
            }else{

                res
                    .status(201)
                    .json({ message: "No contracts found", success: false });
            }

            next();

        }
    })
};

module.exports.EndRentContract = async (req, res, next) => {

    try {

        const { itemId } = req.body;

        const foundContract = await RentContract.findOne({itemId})


        if(foundContract){
            const historyContract = await HistoryContract.create({ itemId: foundContract.itemId, rentUserId : foundContract.rentUserId, contractorId: foundContract.contractorId, expires: foundContract.expires });
            await RentContract.findOneAndDelete({itemId}); // Delete the existing rent contract
            return res
                .status(201)
                .json({ message: "Existing rent contract has been deleted.", success: true});
        } else{
            return res
                .status(201)
                .json({ message: "rent contract wasnt found", success: false});
        }
        next();

    } catch (error) {

        console.error(error);

    }

};