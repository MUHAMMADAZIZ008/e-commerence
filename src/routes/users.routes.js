import express from 'express'
import {
    createUserController,
    deleteUserController,
    getAllUserController,
    getUserByIdController,
    updateUserController
} from '../controllers/index.js'
import { userSchema } from '../validators/users.validators.js'
import { checkSchema } from '../middlewares/index.js'

export const usersRouter = express()

usersRouter.get('/', getAllUserController)
usersRouter.get('/:id', getUserByIdController)
usersRouter.post('/', checkSchema(userSchema), authGuard("access"), roleGuard(["admin"]), createUserController)
usersRouter.put('/:id', authGuard("access"), roleGuard(["admin"]), updateUserController)
usersRouter.delete('/:id', authGuard("access"), roleGuard(["admin"]), deleteUserController)