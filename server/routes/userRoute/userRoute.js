import express from 'express';
import userHandler from '../../controllers/userController';
import userMiddlewareHandler from '../../middleWare/userMiddleWare';

const userRoute = express.Router({ mergeParams: true });
userRoute.post('/auth/signup', userHandler.singUp);
userRoute.post('/auth/signin', userHandler.signIn);
userRoute.patch('/user/:userId', userMiddlewareHandler.isAdminUser, userHandler.changeUserToMentor);
userRoute.get('/mentors', userMiddlewareHandler.canViewAllMentors, userHandler.userViewMentors);
userRoute.get('/users', userMiddlewareHandler.isAdminUser, userHandler.adminViewUsers);
userRoute.get('/mentors/:mentorId', userMiddlewareHandler.canViewAllMentors, userHandler.viewSpecificMentor);

export default userRoute;
