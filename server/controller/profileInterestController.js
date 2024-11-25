import Profile from '../model/profile.js';
import Interest from '../model/interest.js';
import catchErrors from '../util/errorUtil.js';

// Add Interests to Profile
const addInterestToProfile = async (req, res) => {
    try {
        const { profile_id, interest_ids } = req.body;

        // Check if profile exists
        const profile = await Profile.findByPk(profile_id);
        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found', status: 'FAILED' });
        }

        // Ensure that all interest_ids are valid
        const interests = await Interest.findAll({ where: { id: interest_ids } });
        if (interests.length !== interest_ids.length) {
            return res.status(404).json({ msg: 'One or more interests not found', status: 'FAILED' });
        }

        // Associate the profile with the interests
        //await profile.setInterests(interests);

        // Add a new record
        await profile.addInterests(interests)

        return res.status(200).json({
            msg: 'Interests added to profile successfully',
            status: 'SUCCESS',
        });
    } catch (error) {
        return catchErrors(error, res);
    }
};

// Get all Interests of a Profile
const getInterestsByProfile = async (req, res) => {
    try {
        const { profile_id } = req.params;

        // Check if profile exists
        const profile = await Profile.findByPk(profile_id);
        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found', status: 'FAILED' });
        }

        // Get interests associated with the profile
        const interests = await profile.getInterests(
            // {
            //     attributes: ['id', 'name'], // Only select the relevant fields from the Interest model
            //     through: {
            //         attributes: [] // Exclude the join table (profile_interests)
            //     }
            // }
            {as: 'interests'}
        );

        return res.status(200).json({
            msg: 'Interests retrieved successfully',
            data: interests,
            status: 'SUCCESS',
        });
    } catch (error) {
        return catchErrors(error, res);
    }
};

// Remove Interest from Profile
const removeInterestFromProfile = async (req, res) => {
    try {
        const { profile_id, interest_id } = req.body;

        const profile = await Profile.findByPk(profile_id);
        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found', status: 'FAILED' });
        }

        const interest = await Interest.findByPk(interest_id);
        if (!interest) {
            return res.status(404).json({ msg: 'Interest not found', status: 'FAILED' });
        }

        // Check if the interest is already associated with the profile
        const isAssociated = await profile.hasInterest(interest);
        if (!isAssociated) {
            return res.status(400).json({
                msg: 'Interest is not associated with this profile',
                status: 'FAILED',
            });
        }

        // Remove the association
        await profile.removeInterest(interest);

        return res.status(200).json({
            msg: 'Interest removed from profile successfully',
            status: 'SUCCESS',
        });
    } catch (error) {
        return catchErrors(error, res);
    }
};


export default { addInterestToProfile, getInterestsByProfile, removeInterestFromProfile };
