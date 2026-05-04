import { ITrip, ITripData } from "../../entities/trip.types.js";


export interface ITripUseCase {
  addTrip(data: {
    file: Express.Multer.File;
    tripName: string;
    userId: string;
  }): Promise<any>;

  getUserTrips(
    userId: string,
    search?: string,
    page?: number,
    limit?: number
  ): Promise<{ trips: ITrip[]; total: number }>;

  getUserTripsDetails (userId:string, tripId:string):Promise<ITripData[]|void>
}