import Interest from '../model/interest.js';
import catchErrors from '../util/errorUtil.js';

// Create Interest
const createInterest = async (req, res) => {
    try {
        const { name } = req.body;

        // Check if the interest already exists
        let interest = await Interest.findOne({ where: { name } });
        if (interest) {
            return res.status(400).json({ msg: 'Interest already exists', status: 'FAILED' });
        }

        // Create the new interest
        interest = await Interest.create({ name });
        return res.status(201).json({
            msg: 'Interest created successfully',
            data: interest,
            status: 'SUCCESS',
        });
    } catch (error) {
        return catchErrors(error, res);
    }
};

// Get all Interests
const getAllInterests = async (req, res) => {
    try {
        const interests = await Interest.findAll();
        return res.status(200).json({
            msg: 'Interests retrieved successfully',
            data: interests,
            status: 'SUCCESS',
        });
    } catch (error) {
        return catchErrors(error, res);
    }
};

export default { createInterest, getAllInterests };
