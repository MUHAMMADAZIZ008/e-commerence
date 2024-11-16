import { verifyToken } from "../utils/index.js"

export const checkSchema = (schema) => {
    return (req, res, next) => {
        try {
            const body = req.body
            schema.parse(body)
            next()
        } catch (error) {
            next(error)
        }
    }
}



export const authGuard = (type) => {
    return (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(" ")[1]
            if (!token) {
                return res.status(401).send({
                    message: "no token provided"
                })
            }
            const decode = verifyToken(token, type)
            req.user = decode
            next()
        }
        catch (e) {
            logger.error(e)
            next(e)
        }
    }
}

export const roleGuard = (allowedRoles) => {
    return (req, res, next) => {
        try {
            const userRole = req.user.role
            if (allowedRoles.includes(userRole)) {
                next()
            } else {
                return res.status(403).send({
                    message: "Access denied: insufficient permissions"
                })
            }
        }
        catch (e) {
            logger.error(e)
            next(e)
        }
    }
}