import { logger } from '../utils/index.js'
import { 
    createUserService,
    deleteUserService,
    getAllUserService, 
    getById, 
    getUserByIdService, 
    updateUserService
} from '../services/index.js'

export const getAllUserController = async(req, res, next) => {
    try {
        const query = 'select * from users'
        const allData = await getAllUserService(query)
        res.status(200).send({
            message: 'success',
            data: allData,
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}



export const getUserByIdController = async(req, res, next) => {
    try {
        const query = 'select * from users where id = $1'
        const id = req.params.id
        const data = await getUserByIdService(query, [id])

        res.status(200).send({
            message: 'success',
            data: data,
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}


export const createUserController = async (req, res, next) => {
    try {
        const {name, email, password, role, avatar, username, birth_of_date, phone_number} = req.body

        const data = [name, email, password, role, avatar, username, birth_of_date, phone_number]
        const newData = await createUserService(data)
        res.status(201).send({
            message: 'created',
            data: newData.id,
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const updateUserController = async (req, res, next) => {
    try {
        
        const id = +req.params.id
        const {name, email, password, role, avatar, username, birth_of_date, phone_number} = req.body
        logger.info(req.body)
        const oldUser = await getById(id)

        if(!oldUser[0]){
            return res.status(404).send({
                message: "user not found",
                data: oldUser.length
            })
        }

        const data = [
            name || oldUser[0].name,
            email|| oldUser[0].email, 
            password || oldUser[0].password, 
            role || oldUser[0].role,
            avatar || oldUser[0].avatar,
            username || oldUser[0].username,
            birth_of_date || oldUser[0].birth_of_date,
            phone_number || oldUser[0].phone_number,
            id
        ]

        const updateData = await updateUserService(data)
        res.status(200).send({
            message: 'updated',
            data: updateData,
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const deleteUserController = async (req, res, next) => {
    try {
        const id = +req.params.id
        const oldUser = await getById(id)
        if(!oldUser[0]){
            return res.status(404).send({
                message: "user not found",
                data: oldUser.length
            })
        }
        const deleteUser = await deleteUserService(id)
        res.status(200).send({
            message: 'delete',
            data: deleteUser,
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}
