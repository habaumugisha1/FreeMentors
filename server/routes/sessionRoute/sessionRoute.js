import express from 'express';
import routeMiddleware from '../../middleWare/userMiddleWare';
import sessionRequestHandler from '../../controllers/sessionRequestController';

const sessionRoute = express.Router({ mergeParams: true });
sessionRoute.post('/sessions', routeMiddleware.canViewAllMentors, sessionRequestHandler.createSessionRequest);
sessionRoute.get('/user/sessions', routeMiddleware.canViewAllMentors, sessionRequestHandler.userSessions);
sessionRoute.post('/sessions/:sessionId/review', routeMiddleware.canViewAllMentors, sessionRequestHandler.sessionReview);
sessionRoute.get('/mentor/sessions', routeMiddleware.isMentor, sessionRequestHandler.mentorSessions);
sessionRoute.get('/sessions/reviews', routeMiddleware.isAdminUser, sessionRequestHandler.adminAllSessions);

sessionRoute.patch('/sessions/:sessionId/accept', routeMiddleware.isMentor, sessionRequestHandler.acceptSession);
sessionRoute.patch('/sessions/:sessionId/reject', routeMiddleware.isMentor, sessionRequestHandler.rejectSession);
sessionRoute.delete('/sessions/:sessionId/review', routeMiddleware.isAdminUser, sessionRequestHandler.deleteSessionReview);
export default sessionRoute;
