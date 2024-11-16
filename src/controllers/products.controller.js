import {
    createProductService,
    deleteProductService,
    getProductsSevice,
    updateProductsService
} from "../services/index.js"
import { logger } from "../utils/logger.js"

export const getAllProductsController = async (req, res, next) => {
    try {
        const allProducts = await getProductsSevice("all")
        return res.status(200).send({
            message: "success",
            date: allProducts
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}


export const getProductsByIdController = async (req, res, next) => {
    try {
        const id = req.params.id
        const product = await getProductsSevice('id', id)
        if (!product[0].id) {
            return res.status(404).send({
                message: 'not found'
            })
        }
        return res.status(200).send({
            message: "success",
            date: product
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const createProductsController = async (req, res, next) => {
    try {
        const body = req.body
        const newCategory = await createProductService(body)
        return res.status(201).send({
            message: "created",
            date: newCategory[0].id
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}


export const updateProductsController = async (req, res, next) => {
    try {
        const body = req.body
        const id = +req.params.id
        const updatedProduct = await updateProductsService(body, id)
        if (!updatedProduct) {
            return res.status(404).send({
                message: "products not found"
            })
        }
        return res.status(200).send({
            message: "updated",
            date: updatedProduct[0].id
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const deleteProductsController = async (req, res, next) => {
    try {
        const id = +req.params.id
        const deleteProduct = await deleteProductService(id)
        if (!deleteProduct) {
            return res.status(404).send({
                message: "category not found"
            })
        }
        return res.status(200).send({
            message: "deleted",
            date: deleteProduct[0].id
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}