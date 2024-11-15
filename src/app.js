import express from "express"
import morgan from "morgan"
import { config } from "dotenv";
import { createAdressesTable, createCategoriesTable, createsSocialTable, createUserTable } from "./schema/index.js";
import { addressessRouter, authRoutes, categoriesRouter, socialTableRouter, usersRouter } from "./routes/index.routes.js";

config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// ERROR HANDLE
app.get('/api/v1/setup', async (req, res) => {
    await createUserTable()
    await createAdressesTable()
    await createsSocialTable()
    await createCategoriesTable()
    res.status(201).send({
        message: 'Table created!'
    })
})


app.use("/api/v1/auth", authRoutes)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/addressess', addressessRouter)
app.use('/api/v1/createsSocialTable', socialTableRouter)
app.use('/api/v1/createsCategories', categoriesRouter)


app.use((err, req, res) => {
    if (err) {
        return res.status(400).send({
            message: err.message
        })
    }
})


export default app
