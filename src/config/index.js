import db from "./db.js"
import app from "./app.js"
import token from "./token.js"

export const config = {
    ...db,
    ...app,
    ...token
}

// console.log(config)
