import { body } from 'express-validator';

const subscriptionReqValidator = [
    body('user_id')
        .notEmpty()
        .withMessage('User ID is required')
        .isInt()
        .withMessage('User ID must be an integer'),
    body('subscription_type')
        .notEmpty()
        .withMessage('Subscription type is required')
        .isIn(['free', 'premium', 'gold', 'vip'])
        .withMessage('Subscription type must be one of the following: free, premium, gold, vip'),
    body('start_date')
        .notEmpty()
        .withMessage('Start date is required')
        .isDate()
        .withMessage('Start date must be a valid date'),
    body('end_date')
        .notEmpty()
        .withMessage('End date is required')
        .isDate()
        .withMessage('End date must be a valid date')
        .custom((value, { req }) => value > req.body.start_date)
        .withMessage('End date must be later than start date'),
];

export default subscriptionReqValidator;
