const User = require("../Models/UserModel");
const Room = require("../Models/RoomModel");
const Deposition = require("../Models/DepositionModel")
const Shelf = require("../Models/ShelfModel")

const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");

module.exports.CreateRoom = async (req, res, next) => {
    
    try {
        
        const { name, floor, buildingId } = req.body;

        if(!name){
            return res.json({ message: "Name was not provided", success: false });
        }
        console.log(floor)
        if(!floor && floor != 0){
            return res.json({ message: "Floor was not provided", success: false });
        }

        if(!buildingId){
            return res.json({ message: "BuildingId was not provided", success: false });
        }
        
        const room = await Room.create({ name, floor, buildingId });
        
        res
            .status(201)
            .json({ message: "Room was being created", success: true, room : room });
        
        next();
    
    } catch (error) {
        
        console.error(error);
        
    }
    
};


module.exports.DeleteRoom = async (req, res, next) => {
    const { roomId } = req.body;
    console.log("im being called")
    try {

        // Find all shelves belonging to the rooms of the building
        const shelves = await Shelf.find({ roomId });

        // Extract shelfIds
        const shelfIds = shelves.map(shelf => shelf._id);

        // Delete depositions belonging to the shelves of the building
        await Deposition.deleteMany({ shelfId: { $in: shelfIds } });

        // Delete shelves belonging to the rooms of the building
        await Shelf.deleteMany({ roomId: roomId } );

        // Delete rooms belonging to the building
        await Room.findOneAndDelete( {_id: roomId} );

        return res.status(200).json({ message: 'Room and associated data deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};