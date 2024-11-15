import { logger } from "../utils/index.js"

export const authController = {
    register: function (req, res, next) {
        try {
            res.send("register")
        } catch (error) {
            logger.error(error)
            next(error)
        }
    },
    login: function (req, res, next) {
        try {
            res.send("register")
        } catch (error) {
            logger.error(error)
            next(error)
        }
    }
}