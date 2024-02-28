const User = require("../Models/UserModel");
const Building = require("../Models/BuildingModel");
const Room = require("../Models/RoomModel")
const Deposition = require("../Models/DepositionModel")
const Shelf = require("../Models/ShelfModel")
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.CreateBuilding = async (req, res, next) => {

    try {
        const { name, address } = req.body;

        if(!name){
            return res.json({ message: "Name was not provided", success: false });
        }

        if(!address){
            return res.json({ message: "Address was not provided", success: false });
        }

        const existingBuilding = await Building.findOne({ name });

        if (existingBuilding) {
            return res.json({ message: "Building already exists", success: false });
        }

        const building = await Building.create({ name, address });

        return res
            .status(201)
            .json({ message: "Building was being created", success: true, building : building });

        next();

    } catch (error) {
        console.error(error);
    }
};

module.exports.DeleteBuilding = async (req, res, next) => {
    const { buildingId } = req.body;
    console.log(buildingId)
    console.log("im being called")
    try {

        const rooms = await Room.find({ buildingId });
        console.log(rooms)

        // Extract roomIds
        const roomIds = rooms.map(room => room._id);

        // Find all shelves belonging to the rooms of the building
        const shelves = await Shelf.find({ roomId: { $in: roomIds } });

        // Extract shelfIds
        const shelfIds = shelves.map(shelf => shelf._id);

        // Delete depositions belonging to the shelves of the building
        await Deposition.deleteMany({ shelfId: { $in: shelfIds } });

        // Delete shelves belonging to the rooms of the building
        await Shelf.deleteMany({ roomId: { $in: roomIds } });

        // Delete rooms belonging to the building
        await Room.deleteMany({ buildingId });

        // Finally, delete the building itself
        await Building.findOneAndDelete({ _id: buildingId });
        return res.status(200).json({ message: 'Building and associated data deleted successfully', success: true});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.GetBuildings = async (req, res, next) => {
    try {

        const buildings = await Building.find();

        const roomsForPrev = await Room.find()

        const shelfs = await Shelf.find()

        const result = []

        for(const building in buildings){
            let roompreviews = []

            for(const room in roomsForPrev){
                if(roomsForPrev[room].buildingId == buildings[building]._id){
                    let roompreview = {
                        _id : roomsForPrev[room]._id,
                        name : roomsForPrev[room].name,
                        shelfs : []
                    }
                    for(const shelf in shelfs){
                        if(shelfs[shelf].roomId == roompreview._id){
                            roompreview.shelfs.push(shelfs[shelf])
                        }
                    }

                    roompreviews.push(roompreview)
                }
            }
            let temp = {
                _id : buildings[building]._id,
                name : buildings[building].name,
                address : buildings[building].address,
                rooms : roompreviews
            }
            result.push(temp)

        }

        if (buildings) {
            return res.json({ buildings: result });
        }
        else{
            return res.json({message: "buildings not found"})
        }
        next();
    } catch (error) {
        console.error(error);
    }

};