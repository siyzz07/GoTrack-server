import { AuthController } from "../../adapters/controllers/auth.controller.js";
import { TripController } from "../../adapters/controllers/trip.controller.js";
import { AuthUseCase } from "../../usecases/auth.useCase.js";
import { TripUseCase } from "../../usecases/trip.useCase.js";
import { tripDatasRepositoryInstance, tripRepsitroyInstance, userRepositoryInstance } from "./respository.di.js";
import { hashServiceInstance, jwtServiceInstance } from "./services.di.js";




const  authUseCaseInstance = new AuthUseCase(hashServiceInstance,jwtServiceInstance,userRepositoryInstance)
const tripUseCaseInstance = new TripUseCase(tripRepsitroyInstance,tripDatasRepositoryInstance)

const authControllerInstance = new AuthController(authUseCaseInstance)
const TripControllerInstance = new TripController(tripUseCaseInstance)


export {
    authControllerInstance ,
    TripControllerInstance
}