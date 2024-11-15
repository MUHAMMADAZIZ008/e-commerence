import { transports, format, createLogger } from 'winston'

export const logger = createLogger({
    level: 'silly',
    format: format.combine (
            format.timestamp(),
            format.json()
    ),
    transports: [
        new transports.Console() ,
        new transports.File({ filename: 'aplication.log' }),
    ]
})
