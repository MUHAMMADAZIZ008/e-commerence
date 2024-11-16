import express from 'express'
import {
    createAddressessController,
    deleteAddressessController,
    getAddressessByIdController,
    getAllAddressessController,
    updateAddressessController,
} from '../controllers/index.js'
import { addressessSchema } from '../validators/index.js'
import { authGuard, checkSchema, roleGuard } from '../middlewares/index.js'

export const addressessRouter = express()

addressessRouter.get('/', getAllAddressessController)
addressessRouter.get('/:id', getAddressessByIdController)
addressessRouter.post('/', checkSchema(addressessSchema), authGuard("access"), roleGuard(["user", "admin"]), createAddressessController)
addressessRouter.put('/:id', authGuard("access"), roleGuard(["user", "admin"]), updateAddressessController)
addressessRouter.delete('/:id', authGuard("access"), roleGuard(["user", "admin"]), deleteAddressessController)
