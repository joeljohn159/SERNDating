import express from 'express';
import interestController from '../controller/interestController.js';

const interestRouter = express.Router();

/**
 * @usage : Create a new Interest
 * @url : http://localhost:8080/interests
 * @method : POST
 * @access : PRIVATE
 */
interestRouter.post('/', interestController.createInterest);

/**
 * @usage : Get all Interests
 * @url : http://localhost:8080/interests
 * @method : GET
 * @access : PUBLIC
 */
interestRouter.get('/', interestController.getAllInterests);

export default interestRouter;
