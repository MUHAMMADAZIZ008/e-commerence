import {
    createAddressesService,
    deleteAddressesService,
    getAddresById,
    getAddressesByIdService,
    getAllAddressesService,
    updateAddressesService,
} from '../services/index.js'

export const getAllAddressessController = async (req, res, next) => {
    try {
        const query = 'select * from addresses'
        const allData = await getAllAddressesService(query)
        res.status(200).send({
            message: 'success',
            data: allData,
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const getAddressessByIdController = async (req, res, next) => {
    try {
        const query = 'select * from addresses where id = $1'
        const id = req.params.id
        const data = await getAddressesByIdService(query, [id])
        res.status(200).send({
            message: 'success',
            data: data,
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const createAddressessController = async (req, res, next) => {
    try {
        const {
            user_id,
            title,
            country,
            city,
            postal_code,
            phone_number,
            landmark,
        } = req.body

        const data = [
            user_id,
            title,
            country,
            city,
            postal_code,
            phone_number,
            landmark,
        ]
        const newData = await createAddressesService(data)
        res.status(201).send({
            message: 'created',
            data: newData.id,
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const updateAddressessController = async (req, res, next) => {
    try {
        const id = +req.params.id
        const {
            user_id,
            title,
            country,
            city,
            postal_code,
            phone_number,
            landmark,
        } = req.body

        const oldAddres = await getAddresById(id)

        if (!oldAddres[0]) {
            return res.status(404).send({
                message: 'addres not found',
                data: oldAddres.length,
            })
        }

        const data = [
            user_id || oldAddres[0].user_id,
            title || oldAddres[0].title,
            country || oldAddres[0].country,
            city || oldAddres[0].city,
            postal_code || oldAddres[0].postal_code,
            phone_number || oldAddres[0].phone_number,
            landmark || oldAddres[0].landmark,
            id,
        ]

        const updateData = await updateAddressesService(data)
        res.status(200).send({
            message: 'updated',
            data: updateData[0].id,
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const deleteAddressessController = async (req, res, next) => {
    try {
        const id = +req.params.id
        const oldAddres = await getAddresById(id)
        if (!oldAddres[0]) {
            return res.status(404).send({
                message: 'addres not found',
                data: oldAddres.length,
            })
        }
        const deleteAddres = await deleteAddressesService(id)
        res.status(200).send({
            message: 'delete',
            data: deleteAddres[0].id,
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}
