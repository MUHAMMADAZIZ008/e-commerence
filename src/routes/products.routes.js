import express from 'express'
import {
    createProductsController,
    deleteProductsController,
    getAllProductsController,
    getProductsByIdController,
    updateProductsController,
} from '../controllers/index.js'
import { checkSchema } from '../middlewares/index.js'
import { productsProfileSchema } from '../validators/index.js'

export const productsRouter = express.Router()

productsRouter.get('/', getAllProductsController)
productsRouter.get('/:id', getProductsByIdController)
productsRouter.post('/', checkSchema(productsProfileSchema), createProductsController)
productsRouter.put('/:id', updateProductsController)
productsRouter.delete('/:id', deleteProductsController)
