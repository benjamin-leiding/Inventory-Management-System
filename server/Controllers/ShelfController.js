const User = require("../Models/UserModel");
const Room = require("../Models/RoomModel");
const Shelf = require("../Models/ShelfModel");
const Deposition = require("../Models/DepositionModel")
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");

module.exports.CreateShelf = async (req, res, next) => {

    try {

        const { name, roomId } = req.body;

        const shelfs = await Shelf.find()

        let number = -1

        const highestShelf = await Shelf.findOne({ roomId }).sort({ number: -1 }).limit(1).exec();

        console.log(highestShelf)

        if (highestShelf) {
            number =  highestShelf.number
        }
        
        number = number + 1

        const shelf = await Shelf.create({ name, number, roomId });

        res
            .status(201)
            .json({ message: "Room was being created", success: true, shelf : shelf });

        next();

    } catch (error) {

        console.error(error);

    }

};

module.exports.PrintShelf = async (req, res, next) => {

    try {
        console.log(req.body)
        const { shelfId } = req.body;
        const shelf = await Shelf.findById(shelfId);

        if(shelf){
            const thing = await fetch("http://127.20.10.11:5000/print/" + shelfId + "/" + shelf.name, {
                method: "POST",
                body: "{}",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            console.log(thing)
            res.status(201).json({ message: "Shelf was printed", success: true });
        }

        // Call next() if necessary, but in this case, it's not needed since the request is handled completely here
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
}

module.exports.DeleteShelf = async (req, res, next) => {

    try {

        const { shelfId } = req.body;

        // Delete depositions belonging to the shelves of the building
        await Deposition.deleteMany({ shelfId: shelfId });

        const deletedShelf = await Shelf.findOneAndDelete({_id: shelfId});
        if (deletedShelf) {
            console.log("Shelf deleted successfully:", deletedShelf);
        } else {
            console.log("Shelf not found with id:", shelfId);
        }

        res
            .status(201)
            .json({ message: "Shelf was being deleted", success: true });

        next();

    } catch (error) {

        console.error(error);

    }

};