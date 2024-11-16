import Profile from '../model/profile.js';
import User from '../model/user.js';
import catchErrors from '../util/errorUtil.js';
import { APP_CONSTANTS } from '../util/constants.js';

const createProfile = async (req, res) => {
    try {
        const { age, gender, location, bio } = req.body;

        const userId = req.headers['theUser']?.id; // Get user ID from headers
        if (!userId) {
            return res.status(400).json({ msg: 'Invalid user ID', status: 'FAILED' });
        }

        // Check if the user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found', status: 'FAILED' });
        }

        // Check if a profile already exists for the user
        const existingProfile = await Profile.findOne({ where: { userId } });
        if (existingProfile) {
            return res
                .status(400)
                .json({ msg: 'Profile already exists', status: 'FAILED' });
        }

        // Create the profile
        const profile = await Profile.create({
            age,
            gender,
            location,
            bio,
            userId,
        });

        return res.status(201).json({
            msg: 'Profile created successfully',
            data: profile,
            status: APP_CONSTANTS.OPERATION_SUCCESS,
        });
    } catch (error) {
        return catchErrors(error, res);
    }
};

const getProfile = async (req, res) => {
    try {
        const userId = req.headers['theUser']?.id; // Get user ID from headers
        if (!userId) {
            return res.status(400).json({ msg: 'Invalid user ID', status: 'FAILED' });
        }

        // Fetch the profile for the user
        const profile = await Profile.findOne({ where: { userId } });
        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found', status: 'FAILED' });
        }

        return res.status(200).json({
            msg: 'Profile fetched successfully',
            data: profile,
            status: APP_CONSTANTS.OPERATION_SUCCESS,
        });
    } catch (error) {
        return catchErrors(error, res);
    }
};

const updateProfile = async (req, res) => {
    try {
        const { age, gender, location, bio } = req.body;
        const userId = req.headers['theUser']?.id; // Get user ID from headers

        if (!userId) {
            return res.status(400).json({ msg: 'Invalid user ID', status: 'FAILED' });
        }

        // Find the profile for the user
        const profile = await Profile.findOne({ where: { userId } });
        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found', status: 'FAILED' });
        }

        // Update the profile
        await profile.update({ age, gender, location, bio });

        return res.status(200).json({
            msg: 'Profile updated successfully',
            data: profile,
            status: APP_CONSTANTS.OPERATION_SUCCESS,
        });
    } catch (error) {
        return catchErrors(error, res);
    }
};

export default {
    createProfile,
    getProfile,
    updateProfile,
};
