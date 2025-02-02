import { createCategoryService, deleteCategoryService, getCategorySevice, updateCategoryService } from "../services/index.js"
import { logger } from "../utils/index.js"

export const getAllCategoryController = async (req, res, next) => {
    try {
        const allCategory = await getCategorySevice("all")
        return res.status(200).send({
            message: "success",
            date: allCategory
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}


export const getCategoryByIdController = async (req, res, next) => {
    try {
        const id = +req.params.id
        const category = await getCategorySevice('id', id)
        if (!category[0].id) {
            return res.status(404).send({
                message: 'not found'
            })
        }
        return res.status(200).send({
            message: "success",
            date: category
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}


export const createCategoryController = async (req, res, next) => {
    try {
        const body = req.body
        const newCategory = await createCategoryService(body)
        return res.status(201).send({
            message: "created",
            date: newCategory[0].id
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const updateCategoryController = async (req, res, next) => {
    try {
        const body = req.body
        const id = +req.params.id
        const updatedCategory = await updateCategoryService(body, id)
        if (!updatedCategory) {
            return res.status(404).send({
                message: "category not found"
            })
        }
        return res.status(200).send({
            message: "updated",
            date: updatedCategory[0].id
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const deleteCategoryController = async (req, res, next) => {
    try {
        const id = +req.params.id
        const deleteCategory = await deleteCategoryService(id)
        if (!deleteCategory) {
            return res.status(404).send({
                message: "category not found"
            })
        }
        return res.status(200).send({
            message: "deleted",
            date: deleteCategory[0].id
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}