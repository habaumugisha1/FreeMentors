import express from 'express';
import userHandler from '../../controllers/userController';

const userApi = express.Router();

userApi.post('/auth/signup', userHandler.singUp);
userApi.post('/auth/signin', userHandler.signIn);

export default userApi;
