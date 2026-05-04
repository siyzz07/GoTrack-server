import { IHashService } from "../../domain/interface/Iservice/IHash.js";
import bcrypt from 'bcrypt'


export class HashService implements  IHashService{


    //-------------------------------------------------- hash password
    convertToHash = async(password: string): Promise<string> => {
        
            const hashedPassword = await bcrypt.hash(password,10)
            return hashedPassword

    }

    //-------------------------------------------------- compare password
    comparePassword = async(hashedPassword: string, password: string): Promise<boolean> => {
        
                const result = bcrypt.compare(hashedPassword,password)
                return result

    }



}