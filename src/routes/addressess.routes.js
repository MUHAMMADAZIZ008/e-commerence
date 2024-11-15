import express from 'express'
import {
    createAddressessController,
    deleteAddressessController,
    getAddressessByIdController,
    getAllAddressessController,
    updateAddressessController,
} from '../controllers/index.js'
import { addressessSchema } from '../validators/index.js'
import { checkSchema } from '../middlewares/index.js'

export const addressessRouter = express()

addressessRouter.get('/', getAllAddressessController)
addressessRouter.get('/:id', getAddressessByIdController)
addressessRouter.post('/',checkSchema(addressessSchema),createAddressessController)
addressessRouter.put('/:id', updateAddressessController)
addressessRouter.delete('/:id', deleteAddressessController)
