import express from 'express';
import jwtVerify from '../middleware/jwtVerify.js';
import subscriptionController from '../controller/subscriptionController.js';
import subscriptionReqValidator from '../middleware/subscriptions/subscriptionReqValidator.js';
import expressValidator from '../middleware/expressValidator.js';

const subscriptionRouter = express.Router();

/**
 * @usage : Create or Update Subscription
 * @url : http://localhost:8080/subscriptions
 * @params : user_id, subscription_type, start_date, end_date
 * @method : POST
 * @access : PRIVATE
 */
subscriptionRouter.post(
    '/',
    jwtVerify,
    subscriptionReqValidator,
    expressValidator,
    subscriptionController.createOrUpdateSubscription
);

/**
 * @usage : Get Subscription by User ID
 * @url : http://localhost:8080/subscriptions/:user_id
 * @params : user_id
 * @method : GET
 * @access : PRIVATE
 */
subscriptionRouter.get('/:user_id', jwtVerify, subscriptionController.getSubscriptionByUserId);

export default subscriptionRouter;
