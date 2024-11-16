import express from 'express'
import {
    createCategoryController,
    deleteCategoryController,
    getAllCategoryController,
    getCategoryByIdController,
    updateCategoryController,
} from '../controllers/index.js'
import { authGuard, checkSchema, roleGuard } from '../middlewares/index.js'
import { categoryProfileSchema } from '../validators/index.js'

export const categoriesRouter = express.Router()

categoriesRouter.get('/', getAllCategoryController)
categoriesRouter.get('/:id', getCategoryByIdController)
categoriesRouter.post('/', checkSchema(categoryProfileSchema), authGuard("access"), roleGuard(["admin"]), createCategoryController)
categoriesRouter.put('/:id', authGuard("access"), roleGuard(["admin"]), updateCategoryController)
categoriesRouter.delete('/:id', deleteCategoryController)
