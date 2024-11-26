import express from 'express';
import { getMatches } from '../controller/matchController.js';

const matchRouter = express.Router();

// Route to match profiles
//matchRouter.post('/find', findMatches);

// Route to get all matches for a profile
matchRouter.get('/matches-list/:profile_id', getMatches);

export default matchRouter;
