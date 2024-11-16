import pool from "../databases/index.js"
import { AppError } from "../utils/appError.js"
import { logger, createAccessAndRefresh, sendMail } from "../utils/index.js"

export const getAllUserService = async (query) => {
    try {
        const allData = await pool.query(query)
        return allData.rows
    } catch (error) {
        logger.error(error)
        return error
    }
}

export const getUserByIdService = async (query, data) => {
    try {
        const allData = await pool.query(query, data)
        return allData.rows
    } catch (error) {
        logger.error(error)
        return error
    }
}


export const getUserSevice = async (type, data = "") => {
    try {
        let query = ""
        switch (type) {
            case "all":
                query = `select * from users`
                break;
            case "id":
                query = `select * from users where id = $1`
                break;
            case "email":
                query = `select * from users where email = $1`
                break;
            case "username":
                query = `select * from users where username = $1`
                break;
            case "phone_number":
                query = `select * from users where phone_number = $1`
                break;
        }
        let userData = ""
        if (type === "all") {
            userData = await pool.query(query)
            return userData.rows
        }
        if (type !== "all") {
            userData = await pool.query(query, [data])
            return userData.rows
        }
    } catch (error) {
        throw new Error(error)
    }
}



export const createUserService = async (body) => {
    try {
        const { name, email, password, role, avatar, username, birth_of_date, phone_number } = body

        const data = [name, email, password, role || "user", avatar, username, birth_of_date, phone_number]
        const query = `
            INSERT INTO users (name, email, password, role, avatar, username, birth_of_date, phone_number)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `
        const currentEmail = await getUserSevice("email", email)
        if (currentEmail.length !== 0) {
            throw new AppError("email already exist")
        }

        const currentUsername = await getUserSevice("username", username)
        if (currentUsername.length !== 0) {
            throw new AppError("username already exist")
        }

        const currentPhone = await getUserSevice("phone_number", phone_number)
        if (currentPhone.length !== 0) {
            throw new AppError("phone number already exist")
        }

        const newData = await pool.query(query, data)
        return newData.rows
    } catch (error) {
        logger.error(error)
        throw new Error(error)
    }
}

export const registerService = async (user) => {
    try {
        const link = `http://localhost:3000/api/v1/auth/active/${user[0].id}`

        await sendMail(user[0].email, "cative link", link)
    } catch (error) {
        logger.error(error)
        throw new Error(error)
    }
}

export const loginUserService = async (user) => {
    try {
        const currentUser = await getUserSevice("email", user.email)
        if (currentUser.length === 0) {
            throw new AppError("user or passowrd is wrong", 409)
        }
        if (!currentUser[0].is_active) {
            throw new AppError(`you aren't avtice`, 400)
        }

        if (currentUser[0].password !== user.password) {
            throw new AppError("user or passowrd is wrong", 409)
        }

        const tokens = createAccessAndRefresh(currentUser)
        return tokens
    } catch (error) {
        throw new Error(error)
    }
}

export const activeUserService = async (id) => {
    try {
        const activeUser = await getUserSevice("id", id)
        if (activeUser.length === 0) {
            throw new AppError('uset not found', 404)
        }
        const data = [id]
        const query = `
            UPDATE users set is_active = true WHERE id = $1 RETURNING *
        `
        const updateUser = await pool.query(query, data)
        return updateUser.rows

    } catch (error) {
        throw new Error(error);

    }
}

export const updateUserService = async (data) => {
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
        throw new Error(error)

    }
}

export const deleteUserService = async (id) => {
    try {
        const query = `
            delete from users where id = $1
            RETURNING *
        `
        const deleteUser = await pool.query(query, [id])
        return deleteUser.rows
    } catch (error) {
        logger.error(error)
        throw new Error(error)

    }
}

export const getById = async (id) => {
    try {
        const query = `select * from users where id = $1`
        const data = await pool.query(query, [id])
        return data.rows
    } catch (error) {
        logger.error(error)
        throw new Error(error)
    }
}