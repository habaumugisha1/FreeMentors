import express from 'express';
import userHandler from '../../controllers/userController';

const userRoute = express.Router({ mergeParams: true });
userRoute.post('/auth/signup', userHandler.singUp);
userRoute.post('/auth/signin', userHandler.signIn);
userRoute.patch('/user/:userId', userHandler.changeUserToMentor);
userRoute.get('/mentors', userHandler.userViewMentors);
userRoute.get('/users', userHandler.adminViewUsers);
userRoute.get('/mentors/:mentorId', userHandler.viewSpecificMentor);
userRoute.patch('/users/profile/:userId/edit', userHandler.editUserProfile);
export default userRoute;
