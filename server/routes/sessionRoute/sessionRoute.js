import express from 'express';
import sessionRequest from '../../controllers/sessionRequestController';
import routeMiddleware from '../../middleWare/userMiddleWare';
import sessionRequestHandler from '../../controllers/sessionRequestController';

const sessionRoute = express.Router({ mergeParams: true });
sessionRoute.post('/sessions', routeMiddleware.canViewAllMentors, sessionRequest.createSessionRequest);
sessionRoute.get('/sessions', routeMiddleware.canViewAllMentors, sessionRequestHandler.viewAllSessions);
sessionRoute.patch('/sessions/:sessionId/accept', routeMiddleware.isMentor, sessionRequestHandler.acceptSession);
sessionRoute.patch('/sessions/:sessionId/reject', routeMiddleware.isMentor, sessionRequestHandler.rejectSession);
sessionRoute.post('/sessions/:sessionId/review', routeMiddleware.canViewAllMentors, sessionRequestHandler.sessionReview);
sessionRoute.delete('/sessions/:sessionId/review', routeMiddleware.isAdminUser, sessionRequestHandler.deleteSessionReview);

export default sessionRoute;
