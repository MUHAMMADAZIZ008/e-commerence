import {
    activeUserService,
    createUserService,
    loginUserService,
    registerService
} from "../services/index.js"
import { logger } from "../utils/index.js"

export const register = async (req, res, next) => {
    try {
        const body = req.body
        const newUser = await createUserService(body)
        await registerService(newUser)
        res.status(200).send({
            messega: "an activation email will be sent to you",
            data: newUser
        })
    }
    catch (error) {
        logger.error(error)
        next(error)
    }
}
export const activeUser = (req, res, next) => {
    try {
        const id = +req.params.id
        const active = activeUserService(id)
        return res.status(200).send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Response</title>
                <style>
                    h1{
                        text-aligen: center;
                        font-size: 35px;
                        margin:80px auto;
                    }
                </style>
            </head>
            <body>
                <h1>you are activated</h1>
            </body>
            </html>
        `)
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const body = req.body
        const loginUser = await loginUserService(body)
        return res.status(200).send({
            messega: "welcome",
            accessToken: loginUser.accessToken,
            refreshToken: loginUser.refreshToken
        })
    }
    catch (error) {
        logger.error(error)
        next(error)
    }
}