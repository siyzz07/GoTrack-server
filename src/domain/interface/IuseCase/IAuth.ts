import { IUser } from "../../entities/user.types.js";




export interface IAuthUseCase {
  signUp(data: IUser): Promise<boolean | void>;
  login(
    data: Partial<IUser>,
  ): Promise<{ accessToken: string; refreshToken: string } | void>;
  refreshToken(token: string): Promise<string>;
}