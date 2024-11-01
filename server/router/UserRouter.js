import express from 'express';
import jwtVerify from '../middleware/jwtVerify.js';
import userController from '../controller/UserController.js';
import userReqValidator from '../middleware/user/userReqValidator.js';
import expressValidator from '../middleware/expressValidator.js';

const userRouter = express.Router();

/**
 * @usage : Register a User
 * @url : http://localhost:8080/users/register/
 * @params : username, email, password
 * @method : POST
 * @access : PUBLIC
 */
userRouter.post(
    '/register',
    userReqValidator,
    expressValidator,
    userController.createUser
);

/**
 * @usage : Login a User
 * @url : http://localhost:8080/users/login/
 * @params : email, password
 * @method : POST
 * @access : PUBLIC
 */
userRouter.post('/login', userController.loginUser);

/**
 * @usage : Get User Details
 * @url : http://localhost:8080/users/me/
 * @params : none
 * @method : GET
 * @access : PRIVATE
 */
userRouter.get('/me', jwtVerify, userController.getUserData);


export default userRouter;