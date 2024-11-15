import pool from "../databases/index.js"

export const getCategorySevice = async (type, data) => {
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
        if (query === "all") {
            allCategory = await pool.query(query)
        } else {
            allCategory = await pool.query(query, [data])
        }
        return allCategory.rows
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
        const newCategories = await pool.query(data, query)
        return newCategories.rows
    } catch (error) {
        throw new Error(error)
    }
}