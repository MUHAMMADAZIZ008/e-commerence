import { logger } from "../../utils/logger.js"
import pool from "../../databases/index.js"

export const createsSocialTable = async() =>{
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS social_profiles (
                id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(id),
                platform VARCHAR NOT NULL,
                platform_user VARCHAR NOT NULL
            )
        `)
    } catch (error) {
        logger.error(error)
    }
}