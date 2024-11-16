import { body } from 'express-validator';

const preferenceReqValidator = [
    body('profile_id')
        .notEmpty()
        .withMessage('Profile ID is required')
        .isInt()
        .withMessage('Profile ID must be an integer'),
    body('preferred_gender')
        .notEmpty()
        .withMessage('Preferred gender is required')
        .isIn(['male', 'female', 'other'])
        .withMessage('Preferred gender must be male, female, or other'),
    body('min_age')
        .notEmpty()
        .withMessage('Minimum age is required')
        .isInt()
        .withMessage('Minimum age must be an integer')
        .custom((value, { req }) => value < req.body.max_age)
        .withMessage('Minimum age must be less than the maximum age'),
    body('max_age')
        .notEmpty()
        .withMessage('Maximum age is required')
        .isInt()
        .withMessage('Maximum age must be an integer'),
];

export default preferenceReqValidator;
