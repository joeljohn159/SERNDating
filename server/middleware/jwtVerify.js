import jwt from 'jsonwebtoken';
import configData from '../config/config.json' assert { type: "json" };


const jwtVerify = (req, res, next) => {
    let token = req.headers['x-auth-token'];
    if (!token) {
        return res.status(401).json({ msg: 'Unauthorized user', status: 'FAILED' });
    }

    try {
        let secretkey = configData.JWT_SECRET_KEY;
        let payload = jwt.verify(token, secretkey);

        req.headers['theUser'] = payload;
        next();
    } catch (err) {
        return res
            .status(401)
            .json({ msg: 'Invalid or expired token', status: 'FAILED' });
    }
};

export default jwtVerify;