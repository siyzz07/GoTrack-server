import mongoose, { mongo, Schema } from "mongoose";
import { ITripData } from "../../domain/entities/trip.types.js";




const tripDataShcema = new mongoose.Schema<ITripData>({
    tripId: { 
        type:String, 
        required: true,
    },
    time: { type: Date, required: true },
    ignition: { type: String, enum: ['on', 'off'], required: true },

    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true,
        }
    }
});


tripDataShcema.index({ location: '2dsphere' });

export const tripDataModel = mongoose.model('TripData', tripDataShcema);