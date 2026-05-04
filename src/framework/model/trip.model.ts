import mongoose, { model, Schema } from "mongoose";
import { ITrip } from "../../domain/entities/trip.types.js";


const tripSchema = new Schema<ITrip>({
    userId: {
        type: String,
        required: true,
    },
    tripName:{
        type:String,
        required:true
    },
    tripId:{
        type:String,
        required:true,
        unique:true
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})

export  const tripModel = model<ITrip>('Trip',tripSchema)