import { ObjectId } from "mongoose";
import { ITrip } from "../../domain/entities/trip.types.js";
import { ITripRepository } from "../../domain/interface/Irepositroy/ITrip.repositroy.js";
import { tripModel } from "../../framework/model/trip.model.js";
import { BaseRepository } from "./base.repository.js";


export class TripRepository extends BaseRepository<ITrip> implements ITripRepository{


    private _Trip = tripModel

    constructor(){
        super(tripModel)
    }

     async addTrip(data: { tripName: string; tripId: string; userId: string; createdAt: Date }): Promise<any> {

        let result  = await this.create(data)
        return result
    }


    async getTrip(data: Partial<ITrip>): Promise<ITrip|null> {
        
        let result = await this.findBy(data)
        return result
    }


  async getTripsOfUser(
    userId: string,
    search: string = "",
    page: number = 1,
    limit: number = 10
  ): Promise<{ trips: ITrip[]; total: number }> {
    const query: any = {
      userId,
      $or: [
        { tripName: { $regex: search, $options: "i" } },
        { tripId: { $regex: search, $options: "i" } },
      ],
    };

    const [trips, total] = await Promise.all([
      this._Trip
        .find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      this._Trip.countDocuments(query),
    ]);

    return { trips, total };
  }



}