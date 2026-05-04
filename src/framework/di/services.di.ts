import { HashService } from "../services/hash.services.js";
import { JWTService } from "../services/jwt.services.js";


const hashServiceInstance = new HashService()
const jwtServiceInstance = new JWTService()

export{
    hashServiceInstance,
    jwtServiceInstance
}