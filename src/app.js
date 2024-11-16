import express from "express"
import morgan from "morgan"
import { config } from "dotenv";
import {
    createAdressesTable,
    createCategoriesTable,
    createProductsTable,
    createsSocialTable,
    createUserTable
} from "./schema/index.js";

import {
    addressessRouter,
    authRoutes,
    categoriesRouter,
    productsRouter,
    socialTableRouter,
    usersRouter
} from "./routes/index.routes.js";
import { logger } from "./utils/logger.js";

config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// ERROR HANDLE
app.get('/api/v1/setup', async (req, res, next) => {
    try {
        await createUserTable();
        await createAdressesTable();
        await createsSocialTable();
        await createCategoriesTable();
        await createProductsTable();
        res.status(201).send({
            message: 'Table created!'
        });
    } catch (err) {
        next(err);
    }
});


app.use("/api/v1/auth", authRoutes)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/addressess', addressessRouter)
app.use('/api/v1/createsSocialTable', socialTableRouter)
app.use('/api/v1/categories', categoriesRouter)
app.use('/api/v1/products', productsRouter)



app.use((err, req, res, next) => {
    logger.error('Error:', err);

    if (err) {
        return res.status(err.statusCode || 400).json({
            success: false,
            message: err.message,
        });
    }

    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
    });
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection:', reason);
    process.exit(1);
});

process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    process.exit(1);
});

export default app
