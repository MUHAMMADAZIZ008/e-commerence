import { logger } from "../../utils/logger.js"
import pool from "../../databases/index.js"

export const createAdressesTable = async() =>{
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS addresses (
                id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(id),
                title VARCHAR NOT NULL,
                create_at TIMESTAMPTZ DEFAULT NOW(),
                address_line_1 VARCHAR,
                address_line_2 VARCHAR,
                country VARCHAR NOT NULL,
                city VARCHAR NOT NULL,
                postal_code VARCHAR,
                phone_number VARCHAR,
                landmark VARCHAR
            )
        `)
    } catch (error) {
        logger.error(error)
    }
}