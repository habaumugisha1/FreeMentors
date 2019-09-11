import express from 'express';
import sessionRequestHandler from '../../controllers/sessionRequestController';
import authMiddleware from '../../middleWare/userMiddleWare';

const sessionRoute = express.Router({ mergeParams: true });
sessionRoute.post('/sessions', authMiddleware.isUser, sessionRequestHandler.createSessionRequest);
sessionRoute.get('/user/sessions', authMiddleware.isUser, sessionRequestHandler.userSessions);
sessionRoute.post('/sessions/:sessionId/review', authMiddleware.isUser, sessionRequestHandler.sessionReview);
sessionRoute.get('/mentor/sessions', authMiddleware.isMentor, sessionRequestHandler.mentorSessions);
sessionRoute.get('/sessions/reviews', authMiddleware.isAdminUser, sessionRequestHandler.adminAllSessions);
sessionRoute.patch('/sessions/:sessionId/accept', authMiddleware.isMentor, sessionRequestHandler.acceptSession);
sessionRoute.patch('/sessions/:sessionId/reject', authMiddleware.isMentor, sessionRequestHandler.rejectSession);
sessionRoute.patch('/review/:reviewId', authMiddleware.isUser, sessionRequestHandler.editReview);
sessionRoute.delete('/sessions/:sessionId/review', authMiddleware.isAdminUser, sessionRequestHandler.deleteSessionReview);
export default sessionRoute;
