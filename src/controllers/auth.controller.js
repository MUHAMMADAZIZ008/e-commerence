import { authService, createUserService } from "../services/index.js"
import { logger } from "../utils/index.js"

export const register = async (req, res, next) => {
    try {
        const body = req.body
        const newUser = await createUserService(body)
        await authService(newUser)
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
export const login = (req, res, next) => {
    try {
        res.send("ok")
    }
    catch (error) {
        logger.error(error)
        next(error)
    }
}