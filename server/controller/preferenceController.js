import Preference from '../model/preference.js';
import Profile from '../model/profile.js';
import { APP_CONSTANTS } from '../util/constants.js';
import catchErrors from '../util/errorUtil.js';

// Create or Update User Preferences
const createOrUpdatePreference = async (req, res) => {
    try {
        const { profile_id, preferred_gender, min_age, max_age } = req.body;

        // Check if profile exists
        const profile = await Profile.findByPk(profile_id);
        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found', status: 'FAILED' });
        }

        // Check if preference exists for this profile
        let preference = await Preference.findOne({ where: { profile_id } });

        if (preference) {
            // Update the existing preference
            preference.preferred_gender = preferred_gender;
            preference.min_age = min_age;
            preference.max_age = max_age;
            await preference.save();
        } else {
            // Create a new preference record
            preference = await Preference.create({
                profile_id,
                preferred_gender,
                min_age,
                max_age,
            });
        }

        return res.status(201).json({
            msg: 'Preference saved successfully',
            data: preference,
            status: APP_CONSTANTS.OPERATION_SUCCESS,
        });
    } catch (error) {
        return catchErrors(error, res);
    }
};

// Get User Preferences by Profile ID
const getPreferenceByProfileId = async (req, res) => {
    try {
        const { profile_id } = req.params;

        const preference = await Preference.findOne({ where: { profile_id } });

        if (!preference) {
            return res.status(404).json({ msg: 'Preference not found', status: 'FAILED' });
        }

        return res.status(200).json({
            msg: 'Preference retrieved successfully',
            data: preference,
            status: APP_CONSTANTS.OPERATION_SUCCESS,
        });
    } catch (error) {
        return catchErrors(error, res);
    }
};

export default {
    createOrUpdatePreference,
    getPreferenceByProfileId,
};
