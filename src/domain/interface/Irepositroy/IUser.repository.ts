import { IUser } from "../../entities/user.types.js";

export interface IUserRepository {

    addUser(data:IUser):Promise<IUser>
    getUserDataByEmail (email:string) :Promise<IUser|null>
    
}