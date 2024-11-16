import express from 'express';
import jwtVerify from '../middleware/jwtVerify.js';
import preferenceController from '../controller/preferenceController.js';
import preferenceReqValidator from '../middleware/preference/preferenceReqValidator.js';  // Validation
import expressValidator from '../middleware/expressValidator.js';  // General validator

const preferenceRouter = express.Router();

/**
 * @usage : Create or Update Preferences for a Profile
 * @url : http://localhost:8080/preferences
 * @params : profile_id, preferred_gender, min_age, max_age
 * @method : POST
 * @access : PRIVATE
 */
preferenceRouter.post(
    '/',
    jwtVerify,
    preferenceReqValidator,
    expressValidator,
    preferenceController.createOrUpdatePreference
);

/**
 * @usage : Get Preferences by Profile ID
 * @url : http://localhost:8080/preferences/:profile_id
 * @params : profile_id
 * @method : GET
 * @access : PRIVATE
 */
preferenceRouter.get('/:profile_id', jwtVerify, preferenceController.getPreferenceByProfileId);

export default preferenceRouter;
