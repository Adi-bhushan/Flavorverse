import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        jwt.verify(authHeader, process.env.JWT_SECRET, (err) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            next();
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
};