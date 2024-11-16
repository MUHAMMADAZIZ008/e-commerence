import express from 'express'
import { activeUser, login, register } from '../controllers/index.js'
import { checkSchema } from '../middlewares/index.js'
import { userSchema } from '../validators/index.js'

export const authRoutes = express.Router()


authRoutes.post('/register', checkSchema(userSchema), register)
authRoutes.post('/login', login)
authRoutes.get('/active/:id', activeUser)
