import pool from "../databases/index.js"
import { logger } from "../utils/logger.js"

export const getAllSocialService = async (query) =>{
    try {
        const allData = await pool.query(query)
        return allData.rows
    } catch (error) {
        logger.error(error)
        return error
    }
}

export const getSocialByIdService = async (query, data) =>{
    try {
        const allData = await pool.query(query, data)
        return allData.rows
    } catch (error) {
        logger.error(error)
        return error
    }
}

export const createSocialService = async (data) =>{
    try {
        const query = `
            INSERT INTO social_profiles (user_id, platform, platform_user)
            VALUES($1, $2, $3)
            RETURNING *
        `
        const newData = await pool.query(query, data)
        return newData.rows
    } catch (error) {
        logger.error(error)
        return error
    }
}


export const updateSocialService = async (data) =>{
    try {
        
        const query = `
            UPDATE social_profiles
            SET user_id = $1,
                platform = $2, 
                platform_user = $3, 
            WHERE id = $4
            RETURNING *
        `
        const updateData = await pool.query(query, data)
        return updateData.rows
    } catch (error) {
        logger.error(error)
        return error
    }
}

export const deleteSocialService = async(id) =>{
    try {
        const query = `
            delete from social_profiles where id = $1
            RETURNING *
        `
        const deleteUser = await pool.query(query, [id])
        return deleteUser.rows
    } catch (error) {
        logger.error(error)
    }
}

export const getSocialById = async (id) => {
    try {
        const query = `select * from social_profiles where id = $1`
        const data = await pool.query(query, [id])
        return data.rows
    } catch (error) {
        logger.error(error)
    }
}