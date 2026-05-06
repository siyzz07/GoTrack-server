import { NextFunction, Request, Response } from "express";
import { AppError } from "../../domain/error/app.error.js";


export const errorHandler = (error:AppError | any ,req:Request,res:Response,next:NextFunction)=>{


    console.log( error.statusCode,'--',error.message )
    
    const status = error.statusCode ? Number(error.statusCode) : 500;

    res
    .status(status)
    .json({success:false , message:error.message || 'Internal Server Error' })

}