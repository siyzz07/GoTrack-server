import { emit } from "node:cluster";
import { RoleEnum } from "../domain/constants/enums.js";
import { IUser } from "../domain/entities/user.types.js";
import { AppError } from "../domain/error/app.error.js";
import { IUserRepository } from "../domain/interface/Irepositroy/IUser.repository.js";
import { IHashService } from "../domain/interface/Iservice/IHash.js";
import { IJwtService } from "../domain/interface/Iservice/IJwt.js";
import { IAuthUseCase } from "../domain/interface/IuseCase/IAuth.js";
import { httpStatusEnums } from "../framework/constants/http.status.js";
import {
  AuthMessages,
  ServerMessage,
} from "../framework/constants/message.enums.js";

export class AuthUseCase implements IAuthUseCase {
  private _hashService: IHashService;
  private _jwt: IJwtService;

  private _userRepository: IUserRepository;

  constructor(
    hashService: IHashService,
    jwt: IJwtService,
    userRepository: IUserRepository,
  ) {
    this._hashService = hashService;
    this._jwt = jwt;
    this._userRepository = userRepository;
  }

  //------------------------------------------------------------ signup user

  signUp = async (data: IUser): Promise<boolean | void> => {
    const { email, password, name } = data;

    const userData = await this._userRepository.getUserDataByEmail(email);

    if (userData) {
      throw new AppError(
        AuthMessages.USER_ALREADY_EXISTS,
        httpStatusEnums.BAD_REQUEST,
      );
    } else {
      let hashedPassword = await this._hashService.convertToHash(password);

      let payload = {
        name: name,
        password: hashedPassword,
        email: email,
      };

      let result = await this._userRepository.addUser(payload);

      if (result) {
        return true;
      } else {
        throw new AppError(
          ServerMessage.INTERNAL_ERROR,
          httpStatusEnums.INTERNAL_ERROR,
        );
      }
    }
  };

  //------------------------------------------------------------ login user

  login = async (
    data: Partial<IUser>,
  ): Promise<{ accessToken: string; refreshToken: string } | void> => {
    const { email, password } = data;

    const userData = await this._userRepository.getUserDataByEmail(
      email as string,
    );
    console.log('in login usecase',userData)
    console.log(password)
    if (userData) {
      const isPasswordCorrect = await this._hashService.comparePassword(
        password as string,
        userData.password,
      );
  

      console.log('ppp',isPasswordCorrect)

      if (isPasswordCorrect) {
        const AccesToken = await this._jwt.createAccessJWT({
          id: String(userData._id) as string,
          role: RoleEnum.USER,
        });
        const RefreshToken = await this._jwt.createRefreshJWT({
          id: String(userData._id) as string,
          role: RoleEnum.USER,
        });

        return {
          accessToken: AccesToken,
          refreshToken: RefreshToken,
        };
      } else {
        throw new AppError(
          AuthMessages.INVALID_PASSWORD,
          httpStatusEnums.BAD_REQUEST,
        );
      }
    } else {
      throw new AppError(
        AuthMessages.USER_NOT_FOUND,
        httpStatusEnums.NOT_FOUND,
      );
    }
  };

  refreshToken = async (token: string): Promise<string> => {
    const decoded = await this._jwt.verifyJWT(
      token,
      process.env.JWT_REFRESH_TOKEN as string,
    );

    if (!decoded) {
      throw new AppError(AuthMessages.INVALID_TOKEN, httpStatusEnums.FORBIDDEN);
    }

    const newAccessToken = await this._jwt.createAccessJWT({
      id: decoded.id,
      role: decoded.role,
    });

    return newAccessToken;
  };
}
