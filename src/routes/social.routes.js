import express from 'express'
import { checkSchema } from '../middlewares/index.js'
import {
    createSocialController,
    deleteSocialController,
    getAllSocialController,
    getSocialByIdController,
    updateSocialController,
} from '../controllers/index.js'
import {socialProfileSchema} from '../validators/index.js'

export const socialTableRouter = express()

socialTableRouter.get('/', getAllSocialController)
socialTableRouter.get('/:id', getSocialByIdController)
socialTableRouter.post('/', checkSchema(socialProfileSchema), createSocialController)
socialTableRouter.put('/:id', updateSocialController)
socialTableRouter.delete('/:id', deleteSocialController)
