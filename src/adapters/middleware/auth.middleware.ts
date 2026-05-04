import { Request, Response, NextFunction } from "express";
import { jwtServiceInstance } from "../../framework/di/services.di.js";
import { httpStatusEnums } from "../../framework/constants/http.status.js";
import { AuthMessages } from "../../framework/constants/message.enums.js";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(httpStatusEnums.UNAUTHORIZED).json({
        success: false,
        message: AuthMessages.UNAUTHORIZED_ACCESS,
      });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded = await jwtServiceInstance.verifyJWT(
      token,
      process.env.JWT_ACCESS_TOKEN as string
    );

    if (!decoded) {
      res.status(httpStatusEnums.UNAUTHORIZED).json({
        success: false,
        message: "Token expired or invalid",
      });
      return;
    }

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    res.status(httpStatusEnums.INTERNAL_ERROR).json({
      success: false,
      message: "Authentication failed",
    });
  }
};
