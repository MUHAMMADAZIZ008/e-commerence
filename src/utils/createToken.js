import jwt from 'jsonwebtoken'
import { config } from '../config/index.js';
import { AppError } from './appError.js';

export const createAccessAndRefresh = (user) => {
    try {

        const payload = {
            id: user[0].id,
            username: user[0].user,
            role: user[0].role
        }
        // console.log(payload);

        const accessToken = jwt.sign(payload, config.access.secret, { expiresIn: config.access.time });
        const refreshToken = jwt.sign(payload, config.refresh.secret, { expiresIn: config.refresh.time });
        return {
            accessToken,
            refreshToken
        }
    } catch (error) {
        throw new Error(error)
    }
}
export const forgetToken = (user) => {
    try {
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }
        const forgetToken = jwt.sign(payload, config.token.forget.secret, { expiresIn: config.forget.time });
        return forgetToken
    } catch (error) {
        throw new Error(error)
    }
}

export const verifyToken = (token, type) => {
    try {
        if (type === "access") {
            const decoded = jwt.verify(token, config.access.secret);
            return decoded
        }
        if (type === "refresh") {
            const decoded = jwt.verify(token, config.refresh.secret);
            return decoded
        }
        if (type === "forget") {
            const decoded = jwt.verify(token, config.forget.secret);
            return decoded
        }
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            throw new AppError('JWT error:', error.message);
        } else if (error.name === 'TokenExpiredError') {
            throw new AppError('Token has expired');
        } else {
            throw new AppError('Other error:', error.message);
        }
    }
}