import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/user.js';
import { APP_CONSTANTS } from '../util/constants.js';
import catchErrors from '../util/errorUtil.js';

import configData from '../config/config.json' assert { type: "json" };

const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userObj = await User.findOne({ where: { email } });
        if (userObj) {
            return res.status(401).json({ msg: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ username, email, password: hashPassword });
        const { password: _, ...userWithoutPassword } = user.toJSON(); // Exclude password

        return res.status(201).json({
            msg: 'User Registration Success!',
            data: userWithoutPassword,
            status: APP_CONSTANTS.OPERATION_SUCCESS,
        });
    } catch (error) {
        return catchErrors(error, res);
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userObj = await User.findOne({ where: { email } });
        if (!userObj) {
            return res.status(404).json({ msg: 'User Not Found', status: 'FAILED' });
        }

        const passwordCheck = await bcrypt.compare(password, userObj.password);
        if (!passwordCheck) {
            return res
                .status(401)
                .json({ msg: 'Invalid Password', status: 'FAILED' });
        }

        const payload = { id: userObj.id, email: userObj.email };
        const secretkey = configData.JWT_SECRET_KEY;
        const token = jwt.sign(payload, secretkey);

        const { username, id, createdAt, updatedAt } = userObj;
        return res.status(200).json({
            msg: 'Login success',
            token,
            data: { id, email, username, createdAt, updatedAt },
        });
    } catch (error) {
        return catchErrors(error, res);
    }
};

const getUserData = async (req, res) => {
    try {
        const { id } = req.headers['theUser'];

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const { password: _, ...userWithoutPassword } = user.toJSON(); // Exclude password

        return res.status(200).json({
            msg: 'SUCCESS',
            data: userWithoutPassword,
        });
    } catch (err) {
        return catchErrors(err, res);
    }
};




export default {
    createUser,
    loginUser,
    getUserData,
};