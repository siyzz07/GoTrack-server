import { ITripData } from "../../domain/entities/trip.types.js";
import { ITripDetailsRepository } from "../../domain/interface/Irepositroy/ITripDetails.repository.js";
import { tripDataModel } from "../../framework/model/tripData.model.js";
import { BaseRepository } from "./base.repository.js";

export class TripDetailsRepository
  extends BaseRepository<ITripData>
  implements ITripDetailsRepository
{
  private _tripDetailsModel = tripDataModel;

  constructor() {
    super(tripDataModel);
  }

  async addManyDatas(data: ITripData[]): Promise<any> {
    let result = await this._tripDetailsModel.insertMany(data);
    return result;
  }

  async getDetails(tripId: string): Promise<ITripData[]> {
    const result = await this._tripDetailsModel.find({ tripId });
    return result;
  }
}
