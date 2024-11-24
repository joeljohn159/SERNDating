import Profile from '../model/profile.js';
import Interest from '../model/interest.js';
import Match from '../model/match.js';
import { Op } from 'sequelize';

/**
 * Function to find matches for a profile based on common interests.
 *
 * Considerations:
 * 1. The `profile_id` is passed in the request body, and the function attempts to find this profile in the database.
 * 2. Once the profile is retrieved, the function fetches all other profiles (excluding the given profile) along with their associated interests.
 * 3. It then compares the interests of the given profile to those of potential matches, looking for common interests.
 * 4. If a match is found, it creates entries in the `Match` table for both directions: profile -> match and match -> profile.
 * 5. If no matches are found, an empty array is returned.
 * 6. If a match is found, the matched profiles are returned with success status and the match data.
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
            throw new Error('Profile not found!')
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
        const matchPromises = matchedProfiles.map((otherProfile) => {
            const createMatches = [
                Match.create({ profile_id: profile.id, match_profile_id: otherProfile.id }),
                Match.create({ profile_id: otherProfile.id, match_profile_id: profile.id }),
            ];
            return Promise.all(createMatches);
        });

        await Promise.all(matchPromises);

        console.log('Matches saved successfully.');

        return matchedProfiles;

};
/**
 * Function to get all matches for a specific profile.
 *
 * Considerations:
 * 1. The `profile_id` is passed as a URL parameter.
 * 2. The function retrieves matches where the `profile_id` is either the profile or the match_profile.
 * 3. The `Match` table is queried for any records where either the `profile_id` or the `match_profile_id` matches the given `profile_id`.
 * 4. To avoid duplicate matches (e.g., the same two profiles being matched in both directions), the function filters matches to only include those where the `profile_id` is less than the `match_profile_id`.
 * 5. If no matches are found, an empty array is returned with a success status.
 * 6. If matches are found, they are returned along with their associated profiles (both profiles involved in the match) and success status.
 */


const getMatches = async (req, res) => {
    try {
        const { profile_id } = req.params;

        await findMatchesForProfile(profile_id);

        // Find matches where the given profile is either the profile or the match_profile
        const matches = await Match.findAll({
            where: {
                [Op.or]: [
                    { profile_id },
                    { match_profile_id: profile_id },
                ],
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

        // Filter out duplicate matches (when both profile_id and match_profile_id are the same pair)
        const filteredMatches = matches.filter(match => {
            return match.profile_id < match.match_profile_id; // Ensure no duplicate matches for both directions
        });

        if (filteredMatches.length === 0) {
            return res.status(200).json({
                msg: 'No matches found!',
                status: 'SUCCESS',
                data: [],
            });
        }

        return res.status(200).json({
            msg: 'Matches found!',
            status: 'SUCCESS',
            data: filteredMatches,
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
export {getMatches };





