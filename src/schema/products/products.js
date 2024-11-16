import { logger } from "../../utils/logger.js"
import pool from "../../databases/index.js"

export const createProductsTable = async () => {
    try {
        // await pool.query("CREATE TYPE discount_type AS ENUM ('percentage', 'fixed')")
        await pool.query(`
            CREATE TABLE IF NOT EXISTS products (
                    id SERIAL PRIMARY KEY,
                    category_id INT REFERENCES categories(id) ON DELETE CASCADE,
                    title VARCHAR NOT NULL,
                    picture VARCHAR,
                    summary VARCHAR,
                    description VARCHAR,
                    price REAL NOT NULL,
                    discount_type discount_type DEFAULT 'fixed',
                    discount_value REAL DEFAULT 10,
                    tags TEXT[] DEFAULT ARRAY['phone'],
                    create_at TIMESTAMPTZ DEFAULT NOW(),
                    update_at TIMESTAMPTZ DEFAULT NOW()
            )
        `)
    } catch (error) {
        logger.error(error)
    }
}