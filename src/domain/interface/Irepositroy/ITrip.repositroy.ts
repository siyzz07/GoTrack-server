import { ObjectId } from "mongoose"
import { ITrip } from "../../entities/trip.types.js"


export interface ITripRepository {

    addTrip (data:{tripName:string, tripId:string, userId:string, createdAt:Date}):Promise<any>
    getTrip(data:Partial<ITrip>):Promise<ITrip|null>
    getTripsOfUser(
      userId: string,
      search?: string,
      page?: number,
      limit?: number
    ): Promise<{ trips: ITrip[]; total: number }>;

}


