import { Request, Response } from "express";
import { IAuthUseCase } from "../../domain/interface/IuseCase/IAuth.js";
import { httpStatusEnums } from "../../framework/constants/http.status.js";
import { AuthMessages } from "../../framework/constants/message.enums.js";

export class AuthController {
  private _authUseCase: IAuthUseCase;

  constructor(authUseCase: IAuthUseCase) {
    this._authUseCase = authUseCase;
  }

  //--------------------------------------------- Register new uer

  signup = async (req: Request, res: Response): Promise<void> => {

    console.log('in signup ',req.body)
    const result = await this._authUseCase.signUp(req.body);

    if (result) {
      res
        .status(httpStatusEnums.CREATED)
        .json({ success: true, message: AuthMessages.REGISTER_SUCCESS });
    }
  };

  //--------------------------------------------- Login user
  login = async (req: Request, res: Response): Promise<void> => {
    const result = await this._authUseCase.login(req.body);

    if (result) {
      const { accessToken, refreshToken } = result;

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(httpStatusEnums.OK).json({
        success: true,
        message: AuthMessages.LOGIN_SUCCESS,
        accessToken,
      });
    }
  };
 //--------------------------------------------- Refreh token
  refreshToken = async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies.refreshToken;
    const result = await this._authUseCase.refreshToken(token);

    if (result) {
      res.status(httpStatusEnums.OK).json({
        success: true,
        accessToken: result,
      });
    }
  };

  logout = async (req: Request, res: Response): Promise<void> => {
    res.clearCookie("refreshToken");
    res.status(httpStatusEnums.OK).json({
      success: true,
      message: "Logged out successfully",
    });
  };
}
