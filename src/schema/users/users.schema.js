import { logger } from "../../utils/logger.js"
import pool from "../../databases/index.js"

export const createUserTable = async () => {
    try {
        // await pool.query(`
        //     CREATE TYPE USER_ROLE AS ENUM('user', 'admin', 'manager')
        // `)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR NOT NULL,
            email VARCHAR UNIQUE NOT NULL,
            password VARCHAR NOT NULL,
            role USER_ROLE DEFAULT 'user',
            avatar VARCHAR,
            username VARCHAR UNIQUE NOT NULL,
            birth_of_date DATE,
            phone_number VARCHAR UNIQUE NOT NULL,
            is_active BOOLEAN DEFAULT false,
            create_at TIMESTAMPTZ DEFAULT NOW(),
            update_at TIMESTAMPTZ DEFAULT NOW()
            )
        `)
    } catch (error) {
        logger.error(error)
    }
}