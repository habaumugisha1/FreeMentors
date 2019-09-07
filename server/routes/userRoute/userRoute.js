import express from 'express';
import userHandler from '../../controllers/userController';
import userMiddlewareHandler from '../../middleWare/userMiddleWare';
import dataMdware from '../../middleWare/dataMiddleWare';

const userRoute = express.Router({ mergeParams: true });
userRoute.post('/auth/signup', userHandler.singUp);
userRoute.post('/auth/signin', userHandler.signIn);
userRoute.patch('/user/:userId', userMiddlewareHandler.isAdminUser, dataMdware.isRoleMentor, userHandler.changeUserToMentor);
userRoute.get('/mentors', userMiddlewareHandler.isUser, userHandler.userViewMentors);
userRoute.get('/users', userMiddlewareHandler.isAdminUser, userHandler.adminViewUsers);
userRoute.get('/mentors/:mentorId', userMiddlewareHandler.isUser, userHandler.viewSpecificMentor);
userRoute.patch('/users/profile/:userId/edit', userHandler.editUserProfile);
export default userRoute;
