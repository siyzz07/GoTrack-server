import { NextFunction, Request, Response } from "express";
import { AppError } from "../../domain/error/app.error.js";


export const errorHandler = (error:AppError ,req:Request,res:Response,next:NextFunction)=>{


    console.log( error.statusCode,'--',error.message )

    res
    .status(Number(error.statusCode))
    .json({success:false , message:error.message })

}