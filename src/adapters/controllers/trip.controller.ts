import { Request, Response } from "express";
import { ITripUseCase } from "../../domain/interface/IuseCase/ITrip.js";
import { httpStatusEnums } from "../../framework/constants/http.status.js";

export class TripController {
  private _tripUseCase: ITripUseCase;
  constructor(tripUseCase: ITripUseCase) {
    this._tripUseCase = tripUseCase;
  }

  addNewTrip = async (req: Request, res: Response) => {
    let tripName = req.body.tripName;
    let file = req.file as Express.Multer.File;
    let userId = req.user?.id as string;

    const result = await this._tripUseCase.addTrip({
      file,
      tripName,
      userId,
    });

    res.status(200).json({
      success: true,
      message: "Trip added successfully",
      trip: result.trip,
    });
  };

  getUserTrips = async (req: Request, res: Response) => {
    const { search, page, limit } = req.query;

    const result = await this._tripUseCase.getUserTrips(
      req.user?.id as string,
      search as string,
      Number(page),
      Number(limit),
    );

    res.status(httpStatusEnums.OK).json({
      success: true,
      message: "data fetch successfully",
      data: result.trips,
      total: result.total,
    });
  };

  getTripDetails = async (req: Request, res: Response): Promise<void> => {
    let userId = req.user?.id;
    let tripId = req.params.id;

    let response = await this._tripUseCase.getUserTripsDetails(
      userId as string,
      tripId as string,
    );

    res
      .status(httpStatusEnums.OK)
      .json({
        success: true,
        message: "trip datas fetched successfuly",
        data: response,
      });
  };
}
