import jwt from 'jsonwebtoken';

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        jwt.verify(accessToken, JWT_SECRET);

        next();
    } catch {
        res.status(401).json({
            error: 'Not authorized.'
        });
    }
};

export default authMiddleware;