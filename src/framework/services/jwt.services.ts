import { IJwtService } from "../../domain/interface/Iservice/IJwt.js";
import jwt from "jsonwebtoken";

export class JWTService implements IJwtService {

    // -------------------------------------- create access tokem
  createAccessJWT = async (data: {
    id: string;
    role: string;
  }): Promise<string> => {
    if (!process.env.JWT_ACCESS_TOKEN) {
      throw new Error("error");
    }
    let token = await jwt.sign(data, process.env.JWT_ACCESS_TOKEN, {
      expiresIn: "15m",
    });
    return token;
  };

  // -------------------------------------- create refresh token
  createRefreshJWT = async (data: {
    id: string;
    role: string;
  }): Promise<string> => {
    if (!process.env.JWT_REFRESH_TOKEN) {
      throw new Error("error");
    }

    let token = await jwt.sign(data, process.env.JWT_REFRESH_TOKEN, {
      expiresIn: "7d",
    });
    return token;
  };

  // -------------------------------------- verify the given token
  verifyJWT = async (token: string, secretKey: string): Promise<any> => {
    try {
      let result = await jwt.verify(token, secretKey);
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("error verify jwt", error.message);
      }
    }
  };
}
