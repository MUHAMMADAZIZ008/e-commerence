import { config } from "dotenv";
config()

export default {
    access: {
        secret: process.env.JWT_ACCESS_SECRET,
        time: process.env.JWT_ACCESS_EXPIRES_IN
    },
    refresh: {
        secret: process.env.JWT_REFRESH_SECRET,
        time: process.env.JWT_REFRESH_EXPIRES_IN
    },
    forget: {
        secret: process.env.JWT_FORGET_PASSWORD_SECRET,
        time: process.env.JWT_FORGET_PASSWORD_EXPIRES_IN
    }
}
