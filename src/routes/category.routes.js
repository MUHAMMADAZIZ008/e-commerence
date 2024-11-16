import express from 'express'
import {
    createCategoryController,
    deleteCategoryController,
    getAllCategoryController,
    getCategoryByIdController,
    updateCategoryController,
} from '../controllers/index.js'
import { checkSchema } from '../middlewares/index.js'
import { categoryProfileSchema } from '../validators/index.js'

export const categoriesRouter = express.Router()

categoriesRouter.get('/', getAllCategoryController)
categoriesRouter.get('/:id', getCategoryByIdController)
categoriesRouter.post('/', checkSchema(categoryProfileSchema), createCategoryController)
categoriesRouter.put('/:id', updateCategoryController)
categoriesRouter.delete('/:id', deleteCategoryController)
