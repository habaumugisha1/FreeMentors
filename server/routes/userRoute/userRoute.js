import express from 'express';
import userHandler from '../../controllers/userController';
import authMiddleware from '../../middleWare/userMiddleWare';
import checkMiddleware from '../../middleWare/dataMiddleWare';

const userRoute = express.Router({ mergeParams: true });
userRoute.post('/auth/signup', userHandler.singUp);
userRoute.post('/auth/signin', userHandler.signIn);
userRoute.patch('/user/:userId', authMiddleware.isAdminUser, checkMiddleware.isRoleMentor, userHandler.changeUserToMentor);
userRoute.get('/mentors', authMiddleware.isUser, userHandler.userViewMentors);
userRoute.get('/users', authMiddleware.isAdminUser, userHandler.adminViewUsers);
userRoute.get('/mentors/:mentorId', authMiddleware.isUser, userHandler.viewSpecificMentor);
userRoute.patch('/users/profile/:userId/edit', userHandler.editUserProfile);
export default userRoute;
