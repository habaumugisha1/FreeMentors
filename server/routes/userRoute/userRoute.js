import express from 'express';
import swaggerUi from 'swagger-ui-express';
import userHandler from '../../controllers/userController';
import userMiddlewareHandler from '../../middleWare/userMiddleWare';
import swaggerDoc from '../../../swagger.json';

const userRoute = express.Router({ mergeParams: true });
userRoute.post('/auth/signup', userHandler.singUp);
userRoute.post('/auth/signin', userHandler.signIn);
userRoute.patch('/user/:userId', userMiddlewareHandler.isAdminUser, userHandler.changeUserToMentor);
userRoute.get('/mentors', userMiddlewareHandler.canViewAllMentors, userHandler.userViewMentors);
userRoute.get('/users', userMiddlewareHandler.isAdminUser, userHandler.adminViewUsers);
userRoute.get('/mentors/:mentorId', userMiddlewareHandler.canViewAllMentors, userHandler.viewSpecificMentor);
userRoute.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

export default userRoute;
