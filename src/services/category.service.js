import pool from "../databases/index.js"

export const getCategorySevice = async (type, data = "") => {
    try {
        let query = ""
        switch (type) {
            case "all":
                query = `select * from categories`
                break;
            case "id":
                query = `select * from categories where id = $1`
                break;
            case "name":
                query = `select * from categories where name = $1`
                break;
            case "tag":
                query = `select * from categories where tag = $1`
                break;
        }
        let allCategory = ""

        if (type === "all") {
            allCategory = await pool.query(query)
            return allCategory.rows
        }
        if (type !== "all") {
            allCategory = await pool.query(query, [data])
            return allCategory.rows
        }
    } catch (error) {
        throw new Error(error)
    }
}



export const createCategoryService = async (category) => {
    try {
        const data = [
            category.name,
            category.description,
            category.tag
        ]
        const query = `
            INSERT INTO categories(name, description, tag)
            VALUES ($1, $2, $3)
            RETURNING *
        `
        const newCategories = await pool.query(query, data)
        return newCategories.rows
    } catch (error) {
        throw new Error(error)
    }
}

export const updateCategoryService = async (category, id) => {
    try {
        const oldCategory = await getCategorySevice("id", id)
        if (oldCategory.length === 0) {
            return false
        }
        const data = [
            category.name || oldCategory[0].name,
            category.description || oldCategory[0].description,
            category.tag || oldCategory[0].tag,
            id
        ]
        const query = `
            UPDATE categories
            SET name = $1, description = $2, tag = $3
            WHERE id = $4
            RETURNING *
        `
        const updateCategories = await pool.query(query, data)
        return updateCategories.rows
    } catch (error) {
        throw new Error(error)
    }
}

export const deleteCategoryService = async (id) => {
    try {
        const oldCategory = await getCategorySevice("id", id)
        if (oldCategory.length === 0) {
            return false
        }

        const query = `
            DELETE FROM categories WHERE id = $1
            RETURNING *
        `
        const updateCategories = await pool.query(query, [id])
        return updateCategories.rows
    } catch (error) {
        throw new Error(error)
    }
}