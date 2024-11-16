import { config } from "dotenv"
import nodemailer from "nodemailer"
import { logger } from "./logger.js"
config()

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD
    }
})


export const sendMail = (to, subject, text) => {
    transport.sendMail({
        from: process.env.MAILTRAP_USERNAME,
        to,
        subject,
        text
    },
        function (error, info) {
            if (error) {
                logger.info(error);
            } else {
                logger.error(`sent: ${info.response}`);

            }
        })
}