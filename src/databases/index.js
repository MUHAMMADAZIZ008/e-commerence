import { config } from '../config/index.js'
import pg from 'pg'
const {Pool} = pg

const pool = new Pool({
    user: config.postgres.user,
    password: config.postgres.password,
    host: config.postgres.host,
    database: config.postgres.database
})

export default pool