import pool from "../databases/index.js"
import { logger } from "../utils/logger.js"

export const getAllUserService = async (query) =>{
    try {
        const allData = await pool.query(query)
        return allData.rows
    } catch (error) {
        logger.error(error)
        return error
    }
}

export const getUserByIdService = async (query, data) =>{
    try {
        const allData = await pool.query(query, data)
        return allData.rows
    } catch (error) {
        logger.error(error)
        return error
    }
}

export const createUserService = async (data) =>{
    try {
        const query = `
            INSERT INTO users (name, email, password, role, avatar, username, birth_of_date, phone_number)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `
        const newData = await pool.query(query, data)
        return newData.rows
    } catch (error) {
        logger.error(error)
        return error
    }
}


export const updateUserService = async (data) =>{
    try {
        const query = `
            UPDATE users
            SET name = $1,
                email = $2, 
                password = $3, 
                role = $4,
                avatar = $5,
                username = $6,
                birth_of_date = $7,
                phone_number = $8
            WHERE id = $9
            RETURNING *
        `
        const updateData = await pool.query(query, data)
        return updateData.rows
    } catch (error) {
        logger.error(error)
        return error
    }
}

export const deleteUserService = async(id) =>{
    try {
        const query = `
            delete from users where id = $1
            RETURNING *
        `
        const deleteUser = await pool.query(query, [id])
        return deleteUser.rows
    } catch (error) {
        logger.error(error)
    }
}

export const getById = async (id) => {
    try {
        const query = `select * from users where id = $1`
        const data = await pool.query(query, [id])
        return data.rows
    } catch (error) {
        logger.error(error)
    }
}