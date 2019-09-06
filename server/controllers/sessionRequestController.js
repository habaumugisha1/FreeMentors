import Joi from '@hapi/joi';
import { Sessions, Reviews, Users } from '../models/myDb';
import sessionReviewResponse from '../helpers/sessionRevieRes';
import sessionResponse from '../helpers/sessionResponse';
import reviewResponse from '../helpers/reviewResponse';
import { sessionSchema } from '../helpers/validationSchema';


class sessionRequestHandler {
  static createSessionRequest(req, res) {
    Joi.validate(req.body, sessionSchema, (err, value) => {
      if (err) return res.status(400).json({ error: err.details[0].message });
      const mentor = Users.find((mentor) => mentor.id === parseInt(value.mentorId, 10));
      if (!mentor) return res.status(404).json({ status: 404, message: 'Mentor not found' });
      const newSession = {
        id: Sessions.length + 1,
        mentorId: mentor.id,
        menteeId: req.authUser.id,
        mentorName: `${mentor.firstname}${mentor.lastname}`,
        menteeName: `${req.authUser.firstname} ${req.authUser.lastname}`,
        category: value.category,
        question: value.question,
        menteeEmail: req.authUser.email,
        status: 'pending',
      };

      Sessions.push(newSession);
      res.status(201).json({ status: 201, message: 'Session created successfully', data: sessionResponse(newSession) });
    });
  }

  static userSessions(req, res) {
    const allSessions = Sessions.filter((session) => session.menteeId === req.authUser.id);
    const userSessions = [];
    allSessions.forEach((session) => {
      userSessions.push(sessionResponse(session));
    });
    res.status(200).json({ status: 200, data: userSessions });
  }

  static mentorSessions(req, res) {
    const allSessions = Sessions.filter((session) => session.mentorId === req.authUser.id);
    const mentorSessions = [];
    allSessions.forEach((session) => {
      mentorSessions.push(sessionResponse(session));
    });
    res.status(200).json({ status: 200, data: mentorSessions });
  }

  static adminAllSessions(req, res) {
    const sessionReviews = [];
    Sessions.forEach((session) => {
      sessionReviews.push(sessionReviewResponse(session));
    });
    res.status(200).json({ status: 200, message: 'Ok', data: sessionReviews });
  }

  static acceptSession(req, res) {
    const singleSession = Sessions.find((session) => session.id === parseInt(req.params.sessionId, 10));
    if (!singleSession) return res.status(404).json({ data: singleSession });
    if (singleSession.mentorId !== req.authUser.id) return res.status(403).json({ status: 403, message: 'This session is not yours' });
    singleSession.status = req.body.status;
    res.status(201).json({ status: 201, data: sessionResponse(singleSession) });
  }

  static rejectSession(req, res) {
    const singleSession = Sessions.find((session) => session.id === parseInt(req.params.sessionId, 10));
    if (!singleSession) return res.status(404).json({ status: 404, message: 'No session found', data: singleSession });
    if (singleSession.mentorId !== req.authUser.id) return res.status(403).json({ status: 403, message: 'This session is not yours' });
    singleSession.status = req.body.status;
    res.status(201).json({ status: 201, data: sessionResponse(singleSession) });
  }

  static sessionReview(req, res) {
    const singleSession = Sessions.find((session) => session.id === parseInt(req.params.sessionId, 10));
    if (!singleSession) return res.status(404).json({ data: singleSession });
    if (req.body.score < 1 && req.body.score > 5) return res.status(400).json({ message: 'Score should be 1 up to 5' });
    const prevReview = Reviews.filter((review) => review.sessionId === parseInt(req.params.sessionId, 10) && review.menteeId === req.authUser.id);
    if (prevReview.length > 0) return res.status(400).json({ status: 409, message: 'You allowed to review only one time' });
    const userReview = {
      id: Reviews.length + 1,
      sessionId: req.params.sessionId,
      mentorId: singleSession.mentorId,
      menteeId: singleSession.menteeId,
      score: req.body.score,
      menteeFullName: `${req.authUser.firstname} ${req.authUser.lastname}`,
      remark: req.body.remark,

    };
    Reviews.push(userReview);
    res.status(201).json({ status: 201, message: 'Review created successfully', data: reviewResponse(userReview) });
  }

  static editReview(req, res) {
    const review = Reviews.find((rev) => rev.id === parseInt(req.params.reviewId, 10) && rev.menteeId === req.authUser.id);
    if (!review) return res.status(404).json({ data: review });
    review.score = req.body.score;
    review.remark = req.body.remark;
    res.status(201).json({ status: 201, data: reviewResponse(review) });
  }

  static deleteSessionReview(req, res) {
    const sessionReview = Reviews.find((review) => review.sessionId === parseInt(req.params.sessionId, 10));
    if (!sessionReview) return res.status(404).json({ data: sessionReview });
    Reviews.splice(Reviews.indexOf(sessionReview), 1);
    res.status(200).json({ data: { status: 200, message: 'Review Deleted successfully ', review: reviewResponse(sessionReview) } });
  }
}

export default sessionRequestHandler;
