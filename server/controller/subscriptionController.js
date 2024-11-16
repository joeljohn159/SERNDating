import Subscription from '../model/Subscription.js';
import User from '../model/User.js'; // Import User model for checking the user
import { APP_CONSTANTS } from '../util/constants.js';
import catchErrors from '../util/errorUtil.js';

// Create or Update Subscription
const createOrUpdateSubscription = async (req, res) => {
    try {
        const { user_id, subscription_type, start_date, end_date } = req.body;

        // Check if user exists
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found', status: 'FAILED' });
        }

        // Check if a subscription already exists for this user
        let subscription = await Subscription.findOne({ where: { user_id } });

        if (subscription) {
            // Update the existing subscription
            subscription.subscription_type = subscription_type;
            subscription.start_date = start_date;
            subscription.end_date = end_date;
            await subscription.save();
        } else {
            // Create a new subscription record
            subscription = await Subscription.create({
                user_id,
                subscription_type,
                start_date,
                end_date,
            });
        }

        return res.status(201).json({
            msg: 'Subscription saved successfully',
            data: subscription,
            status: APP_CONSTANTS.OPERATION_SUCCESS,
        });
    } catch (error) {
        return catchErrors(error, res);
    }
};

// Get Subscription by User ID
const getSubscriptionByUserId = async (req, res) => {
    try {
        const { user_id } = req.params;

        // Fetch the subscription for the user
        const subscription = await Subscription.findOne({ where: { user_id } });

        if (!subscription) {
            return res.status(404).json({ msg: 'Subscription not found', status: 'FAILED' });
        }

        return res.status(200).json({
            msg: 'Subscription retrieved successfully',
            data: subscription,
            status: APP_CONSTANTS.OPERATION_SUCCESS,
        });
    } catch (error) {
        return catchErrors(error, res);
    }
};

export default {
    createOrUpdateSubscription,
    getSubscriptionByUserId,
};
