import express from 'express'
import { authController } from '../controllers/index.js'

export const authRoutes = express.Router()


authRoutes.post('/register', authController.register)
authRoutes.post('/login', authController.login)