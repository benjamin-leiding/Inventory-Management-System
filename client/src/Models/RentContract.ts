export interface RentContract{
    _id : string,
    itemId : string,
    itemName : string,
    rentUserId : string,
    rentUserUserName : string,
    rentUserEmail: string,
    contractorId : string,
    contractorUserName : string,
    contractorEmail : string,
    createdAt : Date,
    expires: Date
}