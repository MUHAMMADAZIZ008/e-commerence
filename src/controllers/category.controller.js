import { createCategoryService, getCategorySevice } from "../services/index.js"
import { logger } from "../utils/index.js"

export const getAllCategoryController = async (req, res, next) => {
    try {
        const allCategory = await getCategorySevice("all", 1)
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
        const id = req.params.id
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
        const newBody = await createCategoryService(body)
        return res.status(201).send({
            message: "created",
            date: newBody
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}