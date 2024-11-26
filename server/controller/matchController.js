import Profile from '../model/profile.js';
import Interest from '../model/interest.js';
import Match from '../model/match.js';
import { Op, col } from 'sequelize';

/**
 * Function to find matches for a profile based on common interests.
 */
const findMatchesForProfile = async (profile_id) => {
    console.log(`Received profile_id: ${profile_id}`);

    // Fetch the profile of the user
    const profile = await Profile.findByPk(profile_id, {
        include: {
            model: Interest,
            as: 'interests', // Use the alias defined in the model association
        },
    });

    if (!profile) {
        console.error(`Profile not found for profile_id: ${profile_id}`);
        throw new Error('Profile not found!');
    }

    console.log(`Profile retrieved: ${JSON.stringify(profile)}`);

    // Fetch all other profiles with their interests
    const potentialMatches = await Profile.findAll({
        where: {
            id: { [Op.ne]: profile_id }, // Exclude the current profile
        },
        include: {
            model: Interest,
            as: 'interests', // Use the alias defined in the model association
        },
    });

    console.log(`Potential matches retrieved: ${JSON.stringify(potentialMatches)}`);

    // Filter profiles with at least one common interest
    const matchedProfiles = potentialMatches.filter((otherProfile) => {
        const commonInterests = profile.interests.filter((interest) =>
            otherProfile.interests.some((otherInterest) => otherInterest.id === interest.id)
        );
        return commonInterests.length > 0;
    });

    if (matchedProfiles.length === 0) {
        console.log('No matches found.');
    }

    console.log(`Matched profiles: ${JSON.stringify(matchedProfiles)}`);

    // Save matches in the Match table
    const matchPromises = matchedProfiles.map(async (otherProfile) => {
        // Always store the smaller ID as profile_id and the larger as match_profile_id
        const [smallerId, largerId] = profile.id < otherProfile.id
            ? [profile.id, otherProfile.id]
            : [otherProfile.id, profile.id];

        // Check if the match already exists
        const existingMatch = await Match.findOne({
            where: { profile_id: smallerId, match_profile_id: largerId },
        });

        if (!existingMatch) {
            return Match.create({ profile_id: smallerId, match_profile_id: largerId });
        }
        return null;
    });

    await Promise.all(matchPromises);

    console.log('Matches saved successfully.');

    return matchedProfiles;
};

/**
 * Function to get all matches for a specific profile.
 */
const getMatches = async (req, res) => {
    try {
        const { profile_id } = req.params;

        await findMatchesForProfile(profile_id);

        // Find matches where the given profile is involved, but only retrieve one direction
        const matches = await Match.findAll({
            where: {
                [Op.or]: [
                    { profile_id: profile_id },
                    { match_profile_id: profile_id },
                ],
                profile_id: { [Op.lt]: col('match_profile_id') }, // Ensure profile_id < match_profile_id
            },
            include: [
                {
                    model: Profile,
                    as: 'profile', // Alias for the first profile
                    attributes: ['id', 'age', 'gender', 'location', 'bio'],
                },
                {
                    model: Profile,
                    as: 'matchedProfile', // Alias for the second profile
                    attributes: ['id', 'age', 'gender', 'location', 'bio'],
                },
            ],
        });

        if (matches.length === 0) {
            return res.status(200).json({
                msg: 'No matches found!',
                status: 'SUCCESS',
                data: [],
            });
        }

        return res.status(200).json({
            msg: 'Matches found!',
            status: 'SUCCESS',
            data: matches,
        });
    } catch (error) {
        console.error(`Error in getMatches: ${error.message}`);
        return res.status(500).json({
            msg: 'Server error!',
            data: error.message,
            status: 'FAILED',
        });
    }
};

// Export the functions
export { getMatches };
