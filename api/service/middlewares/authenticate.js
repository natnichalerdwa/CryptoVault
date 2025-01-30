import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: 'Access token is missing or invalid' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace JWT_SECRET with your secret key
        req.user = decoded; // Populate `req.user` with decoded token payload
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }
};
