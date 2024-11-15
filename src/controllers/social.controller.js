import { createSocialService, deleteSocialService, getAllSocialService, getSocialById, getSocialByIdService, updateSocialService } from '../services/index.js'

export const getAllSocialController = async (req, res, next) => {
    try {
        const query = 'select * from social_profiles'
        const allData = await getAllSocialService(query)
        res.status(200).send({
            message: 'success',
            data: allData,
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const getSocialByIdController = async (req, res, next) => {
    try {
        const query = 'select * from social_profiles where id = $1'
        const id = req.params.id
        const data = await getSocialByIdService(query, [id])
        res.status(200).send({
            message: 'success',
            data: data,
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const createSocialController = async (req, res, next) => {
    try {
        const {
            user_id,
            platform,
            platform_user
        } = req.body

        const data = [
            user_id,
            platform,
            platform_user
        ]
        const newData = await createSocialService(data)
        res.status(201).send({
            message: 'created',
            data: newData.id,
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const updateSocialController = async (req, res, next) => {
    try {
        const id = +req.params.id
        const {
            user_id,
            platform,
            platform_user
        } = req.body

        const oldSocial = await getSocialById(id)

        if (!oldSocial[0]) {
            return res.status(404).send({
                message: 'social not found',
                data: oldSocial.length,
            })
        }

        const data = [
            user_id || oldSocial[0].user_id,
            platform || oldSocial[0].platform,
            platform_user || oldSocial[0].platform_user,
            id
        ]

        const updateData = await updateSocialService(data)
        res.status(200).send({
            message: 'updated',
            data: updateData[0].id,
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const deleteSocialController = async (req, res, next) => {
    try {
        const id = +req.params.id
        const oldSocial = await getAddresById(id)
        if (!oldSocial[0]) {
            return res.status(404).send({
                message: 'social not found',
                data: oldSocial.length,
            })
        }
        const deleteAddres = await deleteSocialService(id)
        res.status(200).send({
            message: 'delete',
            data: deleteAddres[0].id,
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}
