import { Sessions, Reviews } from '../models/myDb';
import sessionReviewResponse from '../helpers/sessionRevieRes';

class sessionRequestHandler {
  static createSessionRequest(req, res) {
    const newSession = {
      id: Sessions.length + 1,
      mentorId: req.body.mentorId,
      menteeId: req.authUser.id,
      question: req.body.question,
      menteeEmail: req.authUser.email,
      status: 'pending',
    };

    Sessions.push(newSession);
    res.status(201).json({ data: newSession });
  }

  static userSessions(req, res) {
    const allSessions = Sessions.filter((session) => session.menteeId === req.authUser.id);
    res.status(200).json({ data: allSessions });
  }

  static mentorSessions(req, res) {
    const allSessions = Sessions.filter((session) => session.mentorId === req.authUser.id);
    res.status(200).json({ data: allSessions });
  }

  static adminAllSessions(req, res) {
    const sessionReviews = [];
    Sessions.forEach((session) => {
      sessionReviews.push(sessionReviewResponse(session));
    });
    res.status(200).json({ data: sessionReviews });
  }

  static acceptSession(req, res) {
    const singleSession = Sessions.find((session) => session.id === parseInt(req.params.sessionId, 10));
    if (!singleSession) return res.status(404).json({ data: singleSession });
    singleSession.status = req.body.status;
    res.status(201).json({ data: singleSession });
  }

  static rejectSession(req, res) {
    const singleSession = Sessions.find((session) => session.id === parseInt(req.params.sessionId, 10));
    if (!singleSession) return res.status(404).json({ data: singleSession });
    singleSession.status = req.body.status;
    res.status(201).json({ data: singleSession });
  }

  static sessionReview(req, res) {
    const singleSession = Sessions.find((session) => session.id === parseInt(req.params.sessionId, 10));
    if (!singleSession) return res.status(404).json({ data: singleSession });
    if (req.body.score > 5) return res.status(400).json({ message: 'Score should be 1 up to 5' });
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
    res.status(201).json({ data: userReview });
  }

  static editReview(req, res) {
    const review = Reviews.find((rev) => rev.id === parseInt(req.params.reviewId, 10) && rev.menteeId === req.authUser.id);
    if (!review) return res.status(404).json({ data: review });
    review.remark = req.body.remark;
    res.status(201).json({ data: review });
  }

  static deleteSessionReview(req, res) {
    const sessionReview = Reviews.find((review) => review.sessionId === parseInt(req.params.sessionId, 10));
    if (!sessionReview) return res.status(404).json({ data: sessionReview });
    Reviews.splice(Reviews.indexOf(sessionReview), 1);
    res.status(200).json({ data: { message: 'Review Deleted successfully ', review: sessionReview } });
  }
}

export default sessionRequestHandler;
