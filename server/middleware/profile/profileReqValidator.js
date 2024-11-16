import { body } from 'express-validator';

const profileReqValidator = [
    body('age')
        .notEmpty()
        .withMessage('Age is required')
        .isInt({ min: 18 })
        .withMessage('Age must be a valid number and at least 18'),
    body('gender')
        .notEmpty()
        .withMessage('Gender is required')
        .isIn(['Male', 'Female', 'Other'])
        .withMessage('Gender must be one of Male, Female, or Other'),
    body('location')
        .notEmpty()
        .withMessage('Location is required')
        .isLength({ min: 2 })
        .withMessage('Location must be at least 2 characters long'),
    body('bio')
        .optional() // Bio is optional
        .isLength({ max: 500 })
        .withMessage('Bio must not exceed 500 characters'),
];

export default profileReqValidator;
