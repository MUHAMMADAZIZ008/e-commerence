import { logger } from "../../utils/logger.js"
import pool from "../../databases/index.js"

export const createCategoriesTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS categories (
                id SERIAL PRIMARY KEY,
                name VARCHAR NOT NULL,
                description VARCHAR,
                tag VARCHAR NOT NULL,
                create_at TIMESTAMPTZ DEFAULT NOW(),
                update_at TIMESTAMPTZ DEFAULT NOW()
            )
        `)
    } catch (error) {
        logger.error(error)
    }
}