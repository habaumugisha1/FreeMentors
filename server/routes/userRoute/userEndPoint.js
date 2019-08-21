import express from 'express';
import userHandler from '../../controllers/userController';
import userMiddlewareHandler from '../../middleWare/userMiddleWare';

const userApi = express.Router({ mergeParams: true });
userApi.post('/auth/signup', userHandler.singUp);
userApi.post('/auth/signin', userHandler.signIn);
userApi.patch('/user/:userId', userMiddlewareHandler.isAdminUser, userHandler.changeUserToMentor);
userApi.get('/mentors', userMiddlewareHandler.canViewAllMentors, userHandler.userViewMentors);
export default userApi;
