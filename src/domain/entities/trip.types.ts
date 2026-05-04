import { ObjectId } from "mongoose";


export interface ITrip{
    _id?:ObjectId|string;
    userId: string;
    tripName:string;
    tripId:string;
    createdAt:Date
}


export interface ITripData {
    _id?: ObjectId|string
    tripId: string;
    time: Date; 
    ignition: 'on' | 'off';
    location: {
        type: 'Point';
        coordinates: [number, number]; // [longitude, latitude]
    };
}