const HistoryContract = require("../Models/HistoryContract");
const User = require("../Models/UserModel");
const Item = require("../Models/ItemModel")

module.exports.GetAllHistoryContracts = async (req, res, next) => {

    try {

        const historyContracts = await HistoryContract.find()
        if(historyContracts){
            let results = []
            for(const index in historyContracts){
                const rentUser = await User.findById(historyContracts[index].rentUserId)
                const contractor = await User.findById(historyContracts[index].contractorId)
                const item = await Item.findById(historyContracts[index].itemId)
                let result = {
                    _id : historyContracts[index]._id,
                    itemId : item._id,
                    itemName : item.name,
                    rentUserId : rentUser._id,
                    rentUserUserName : rentUser.username,
                    rentUserEmail: rentUser.email,
                    contractorId : contractor._id,
                    contractorUserName : contractor.username,
                    contractorEmail : contractor.email,
                    createdAt : historyContracts[index].createdAt,
                    expires: historyContracts[index].expires
                }
                results.push(result)

            }

            console.log(historyContracts)
            res
                .status(201)
                .json({ message: "Here are all History contracts", success: true, historyContracts: results});
        }else{

            res
                .status(201)
                .json({ message: "No History contracts found", success: false });
        }

        next();

    } catch (error) {

        console.error(error);

    }

};