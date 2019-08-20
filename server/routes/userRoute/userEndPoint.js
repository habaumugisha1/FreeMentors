import express from 'express';
import userHandler from '../../controllers/userController';

const userApi = express.Router();

userApi.post('/auth/signup', userHandler.singUp);

export default userApi;
