
import express, { Request, Response } from 'express'
import { authControllerInstance } from '../di/di.js'

const authRoutes = express.Router()


authRoutes.post("/signup", authControllerInstance.signup);
authRoutes.post("/login", authControllerInstance.login);
authRoutes.post("/refresh-token", authControllerInstance.refreshToken);
authRoutes.post("/logout", authControllerInstance.logout);

export default authRoutes;