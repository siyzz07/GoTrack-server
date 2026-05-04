import { ITripData } from "../../entities/trip.types.js";


export interface ITripDetailsRepository {

    addManyDatas (data:ITripData[]):Promise<any>
    getDetails (tripId:string):Promise<ITripData[]|null>

}