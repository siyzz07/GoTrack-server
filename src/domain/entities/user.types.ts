import mongoose from "mongoose";

export interface IUser{
    _id?:mongoose.ObjectId
    email:string;
    password : string,
    name:string
}