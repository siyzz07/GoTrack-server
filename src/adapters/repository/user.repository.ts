import { IUser } from "../../domain/entities/user.types.js";
import { IUserRepository } from "../../domain/interface/Irepositroy/IUser.repository.js";
import { userModel } from "../../framework/model/user.model.js";
import { BaseRepository } from "./base.repository.js";

export class UserRepository extends BaseRepository<IUser> implements IUserRepository {

  private _UserModel = userModel
    constructor() {
        super(userModel)
    }

    // -------------------------------------------------------- add new user
    async addUser(data: IUser): Promise<IUser> {
        
        let result = await this.create(data)
        return result
        
    }
    
    
    // -------------------------------------------------------- get user data by email
    async getUserDataByEmail(email: string): Promise<IUser | null> {

        let  result = await this.findBy({email:email})
        return result

    }





}