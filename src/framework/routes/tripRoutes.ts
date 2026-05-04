import express from 'express'
import { TripControllerInstance } from '../di/di.js'
import { upload } from '../../adapters/middleware/multer.js'
import { authMiddleware } from '../../adapters/middleware/auth.middleware.js'

const tripRoutes = express.Router()

tripRoutes.post('/', authMiddleware, upload.single('file'), TripControllerInstance.addNewTrip)
tripRoutes.get('/',authMiddleware,TripControllerInstance.getUserTrips)
tripRoutes.get('/:id',authMiddleware,TripControllerInstance.getTripDetails)

export default tripRoutes
