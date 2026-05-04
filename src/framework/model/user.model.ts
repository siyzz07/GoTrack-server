import mongoose from "mongoose";
import { IUser } from "../../domain/entities/user.types.js";


const userShcema =new  mongoose.Schema<IUser>({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})

export  const userModel = mongoose.model<IUser>('User',userShcema)