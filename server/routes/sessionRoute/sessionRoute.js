import express from 'express';
import sessionRequest from '../../controllers/sessionRequestController';
import routeMiddleware from '../../middleWare/userMiddleWare';
import sessionRequestHandler from '../../controllers/sessionRequestController';

const sessionRoute = express.Router({ mergeParams: true });
sessionRoute.post('/sessions', routeMiddleware.canViewAllMentors, sessionRequest.createSessionRequest);
sessionRoute.get('/sessions', routeMiddleware.canViewAllMentors, sessionRequestHandler.viewAllSessions);
sessionRoute.patch('/sessions/:sessionId/accept', routeMiddleware.isMentor, sessionRequestHandler.acceptSession);
sessionRoute.patch('/sessions/:sessionId/reject', routeMiddleware.isMentor, sessionRequestHandler.rejectSession);

export default sessionRoute;
