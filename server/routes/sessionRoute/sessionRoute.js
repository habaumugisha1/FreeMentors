import express from 'express';
import sessionRequest from '../../controllers/sessionRequestController';
import routeMiddleware from '../../middleWare/userMiddleWare';

const sessionRoute = express.Router({ mergeParams: true });
sessionRoute.post('/sessions', routeMiddleware.canViewAllMentors, sessionRequest.createSessionRequest);
export default sessionRoute;
