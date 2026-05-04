import { TripRepository } from "../../adapters/repository/trip.repositroy.js";
import { TripDetailsRepository } from "../../adapters/repository/tripDetails.repository.js";
import { UserRepository } from "../../adapters/repository/user.repository.js";

const userRepositoryInstance = new UserRepository();
const tripRepsitroyInstance = new TripRepository();
const tripDatasRepositoryInstance = new TripDetailsRepository()

export { userRepositoryInstance, tripRepsitroyInstance,tripDatasRepositoryInstance };
