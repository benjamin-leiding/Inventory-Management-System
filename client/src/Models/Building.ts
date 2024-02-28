export interface Building {
    _id: string
    name: string,
    address: string,
    rooms : [{
        _id : string
        name: string,
        floor: number,
        shelfs: [{
            _id : string,
            name : string,
            number : number,
        }] | null
    }] | null
}