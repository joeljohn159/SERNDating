import express from 'express';
import jwtVerify from '../middleware/jwtVerify.js';
import profileController from '../controller/ProfileController.js';
import profileReqValidator from '../middleware/profile/profileReqValidator.js';
import expressValidator from '../middleware/expressValidator.js';

const profileRouter = express.Router();

/**
 * @usage: Create a Profile
 * @url: http://localhost:8080/profiles/
 * @params: age, gender, location, bio
 * @method: POST
 * @access: PRIVATE
 */
profileRouter.post(
    '/',
    jwtVerify,
    profileReqValidator,
    expressValidator,
    profileController.createProfile
);

/**
 * @usage: Get User's Profile
 * @url: http://localhost:8080/profiles/me/
 * @params: none
 * @method: GET
 * @access: PRIVATE
 */
profileRouter.get('/me', jwtVerify, profileController.getProfile);

/**
 * @usage: Update Profile
 * @url: http://localhost:8080/profiles/me/
 * @params: age, gender, location, bio
 * @method: PUT
 * @access: PRIVATE
 */
profileRouter.put('/me', jwtVerify, expressValidator, profileController.updateProfile);

export default profileRouter;
