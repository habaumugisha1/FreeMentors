import express from 'express';
import sessionRequestHandler from '../../controllers/sessionRequestController';

const sessionRoute = express.Router({ mergeParams: true });
sessionRoute.post('/sessions', sessionRequestHandler.createSessionRequest);
sessionRoute.get('/user/sessions', sessionRequestHandler.userSessions);
sessionRoute.post('/sessions/:sessionId/review', sessionRequestHandler.sessionReview);
sessionRoute.get('/mentor/sessions', sessionRequestHandler.mentorSessions);
sessionRoute.get('/sessions/reviews', sessionRequestHandler.adminAllSessions);
sessionRoute.patch('/sessions/:sessionId/accept', sessionRequestHandler.acceptSession);
sessionRoute.patch('/sessions/:sessionId/reject', sessionRequestHandler.rejectSession);
sessionRoute.patch('/review/:reviewId', sessionRequestHandler.editReview);
sessionRoute.delete('/sessions/:sessionId/review', sessionRequestHandler.deleteSessionReview);
export default sessionRoute;
