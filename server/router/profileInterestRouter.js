import express from 'express';
import profileInterestController from '../controller/profileInterestController.js';

const profileInterestRouter = express.Router();

/**
 * @usage : Add Interests to a Profile
 * @url : http://localhost:8080/profile-interests
 * @method : POST
 * @access : PRIVATE
 */
profileInterestRouter.post('/', profileInterestController.addInterestToProfile);

/**
 * @usage : Get Interests by Profile ID
 * @url : http://localhost:8080/profile-interests/:profile_id
 * @method : GET
 * @access : PRIVATE
 */
profileInterestRouter.get('/:profile_id', profileInterestController.getInterestsByProfile);

export default profileInterestRouter;
