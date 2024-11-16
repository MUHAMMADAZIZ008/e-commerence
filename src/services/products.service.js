import pool from "../databases/index.js"

export const getProductsSevice = async (type, data = "") => {
    try {
        let query = ""
        switch (type) {
            case "all":
                query = `select * from products`
                break;
            case "id":
                query = `select * from products where id = $1`
                break;
            case "title":
                query = `select * from products where title = $1`
                break;
        }
        let allProducts = ""
        if (type === "all") {
            allProducts = await pool.query(query)
            return allProducts.rows
        }
        if (type !== "all") {
            allProducts = await pool.query(query, [data])
            return allProducts.rows
        }
    } catch (error) {
        throw new Error(error)
    }
}



export const createProductService = async (products) => {
    try {
        const data = [
            products.category_id || null,
            products.title,
            products.picture,
            products.summary,
            products.description,
            products.price,
            products.discount_type,
            products.discount_value || 10,
            products.tags || [],
        ];
        const query = `
            INSERT INTO products(
                category_id,
                title,
                picture,
                summary,
                description,
                price,
                discount_type,
                discount_value,
                tags)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *
        `
        const newProducts = await pool.query(query, data)
        return newProducts.rows
    } catch (error) {
        throw new Error(error)
    }
}

export const updateProductsService = async (products, id) => {
    try {
        const oldProduct = await getProductsSevice("id", id)
        if (oldProduct.length === 0) {
            return false
        }
        const data = [
            products.category_id || oldProduct[0].category_id,
            products.title || oldProduct[0].title,
            products.picture || oldProduct[0].picture,
            products.summary || oldProduct[0].summary,
            products.description || oldProduct[0].description,
            products.price || oldProduct[0].price,
            products.discount_type || oldProduct[0].discount_type,
            products.discount_value || oldProduct[0].discount_value,
            products.tags || oldProduct[0].tags,
            id
        ]

        const query = `
            UPDATE products
            SET category_id = $1,
                title = $2,
                picture = $3,
                summary = $4,
                description = $5,
                price = $6,
                discount_type = $7,
                discount_value = $8,
                tags = $9
            WHERE id = $10
            RETURNING *
        `
        const updateProducts = await pool.query(query, data)
        return updateProducts.rows
    } catch (error) {
        throw new Error(error)
    }
}

export const deleteProductService = async (id) => {
    try {
        const oldProduct = await getProductsSevice("id", id)
        if (oldProduct.length === 0) {
            return false
        }

        const query = `
            DELETE FROM products WHERE id = $1
            RETURNING *
        `
        const updateProduct = await pool.query(query, [id])
        return updateProduct.rows
    } catch (error) {
        throw new Error(error)
    }
}