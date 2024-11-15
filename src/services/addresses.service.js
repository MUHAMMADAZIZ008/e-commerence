import pool from "../databases/index.js"
import { logger } from "../utils/logger.js"

export const getAllAddressesService = async (query) =>{
    try {
        const allData = await pool.query(query)
        return allData.rows
    } catch (error) {
        logger.error(error)
        return error
    }
}

export const getAddressesByIdService = async (query, data) =>{
    try {
        const allData = await pool.query(query, data)
        return allData.rows
    } catch (error) {
        logger.error(error)
        return error
    }
}

export const createAddressesService = async (data) =>{
    try {
        const query = `
            INSERT INTO addresses (user_id, title, country, city, postal_code, phone_number, landmark)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `
        const newData = await pool.query(query, data)
        return newData.rows
    } catch (error) {
        logger.error(error)
        return error
    }
}


export const updateAddressesService = async (data) =>{
    try {
        
        const query = `
            UPDATE addresses
            SET user_id = $1,
                title = $2, 
                country = $3, 
                city = $4,
                postal_code = $5,
                phone_number = $6,
                landmark = $7
            WHERE id = $8
            RETURNING *
        `
        const updateData = await pool.query(query, data)
        return updateData.rows
    } catch (error) {
        logger.error(error)
        return error
    }
}

export const deleteAddressesService = async(id) =>{
    try {
        const query = `
            delete from addresses where id = $1
            RETURNING *
        `
        const deleteUser = await pool.query(query, [id])
        return deleteUser.rows
    } catch (error) {
        logger.error(error)
    }
}

export const getAddresById = async (id) => {
    try {
        const query = `select * from addresses where id = $1`
        const data = await pool.query(query, [id])
        return data.rows
    } catch (error) {
        logger.error(error)
    }
}