
export const checkSchema = (schema) =>{
    return (req, res, next) =>{
        try {
            const body = req.body
            schema.parse(body)
            next()
        } catch (error) {
            // logger.error(error)
            next(error)
        }
    }
}