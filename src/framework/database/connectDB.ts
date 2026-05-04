import mongoose from 'mongoose'



 class ConnectDB {

    private MONGODB_URL 

    constructor(){
        if (!process.env.MONGODB_URL) throw new Error("mongodb url not available")
        this.MONGODB_URL = process.env.MONGODB_URL
    }


     async connect (){

        try{
            await mongoose.connect(this.MONGODB_URL)
            console.log('database connected successfully...')
        }catch(error:unknown){
            console.log('error to connect database :',error)
        }
        
    }


}

export default  ConnectDB
