import mongoose from "mongoose";
import { ITripRepository } from "../domain/interface/Irepositroy/ITrip.repositroy.js";
import { ITripUseCase } from "../domain/interface/IuseCase/ITrip.js";
import { createId } from "./utils/id.generator.js";
import fs from "fs";
import csv from "csv-parser";
import { ITrip, ITripData } from "../domain/entities/trip.types.js";
import { ITripDetailsRepository } from "../domain/interface/Irepositroy/ITripDetails.repository.js";
import { AppError } from "../domain/error/app.error.js";
import { httpStatusEnums } from "../framework/constants/http.status.js";

export class TripUseCase implements ITripUseCase {
  private _tripRepository: ITripRepository;
  private _tripDetailsRepository :ITripDetailsRepository

  constructor(tripRepsitroy: ITripRepository,tripDetailsRepository:ITripDetailsRepository) {
    this._tripRepository = tripRepsitroy;
    this._tripDetailsRepository = tripDetailsRepository
  }

  addTrip = async (data: {
    file: Express.Multer.File;
    tripName: string;
    userId: string;
  }): Promise<any> => {
    let un_id: string = "";
    let isPresent = true;

    while (isPresent) {
      un_id = createId();
      let existingTrip = await this._tripRepository.getTrip({ tripId: un_id });

      if (!existingTrip) {  
        isPresent = false;
      }
    }
    const detailPayload: ITripData[] = [];
    const filePath = data.file?.path;

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => {
          detailPayload.push({
            tripId: un_id,
            time: new Date(row.timestamp),
            ignition: row.ignition,
            location: {
              type: "Point",
              coordinates: [parseFloat(row.longitude), parseFloat(row.latitude)],
            },
          });
        })
        .on("end", async () => {
          try {
            if (detailPayload.length === 0) {
              throw new Error("CSV file is empty or invalid.");
            }
            const savedTrip = await this._tripRepository.addTrip({
              tripName: data.tripName,
              tripId: un_id,
              userId: data.userId,
              createdAt: new Date(),
            });

            await this._tripDetailsRepository.addManyDatas(detailPayload);

            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            resolve({ success: true, trip: savedTrip });
          } catch (err) {
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            reject(err);
          }
        })
        .on("error", (error) => {
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
          reject(error);
        });
    });
  };


  getUserTrips = async (
    userId: string,
    search: string = "",
    page: number = 1,
    limit: number = 10
  ): Promise<{ trips: ITrip[]; total: number }> => {
    let trips = await this._tripRepository.getTripsOfUser(
      userId,
      search,
      page,
      limit
    );


    return trips;
  };



  getUserTripsDetails = async(userId: string, tripId: string): Promise<ITripData[]|void> => {
      
     let trip = await this._tripRepository.getTrip({_id:tripId})
     if(!trip){
        throw new AppError('invalied trip Id',httpStatusEnums.BAD_REQUEST)
     }
     if( trip.userId.toString() !== userId.toString()){
        throw new AppError('invalied',httpStatusEnums.BAD_REQUEST)
     }
     let details = await this._tripDetailsRepository.getDetails(trip.tripId)

     if(details){
        return details
     }else{
        throw new AppError('internal server error',httpStatusEnums.INTERNAL_ERROR)
     }
  }
}
