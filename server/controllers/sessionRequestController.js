import { Sessions, Reviews } from '../models/myDb';

class sessionRequestHandler {
  static createSessionRequest(req, res) {
    const newSession = {
      id: Sessions.length + 1,
      mentorId: req.body.mentorId,
      menteeId: req.userData.id,
      question: req.body.question,
      menteeEmail: req.userData.email,
      status: 'pending',
    };

    Sessions.push(newSession);
    res.status(201).json({ data: newSession });
  }

  static viewAllSessions(req, res) {
    const allSessions = Sessions.filter((session) => session.email === req.userData.email);
    res.status(200).json({ data: allSessions });
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
      menteeFullName: `${req.userData.firstname} ${req.userData.lastname}`,
      remark: req.body.remark,

    };
    Reviews.push(userReview);
    res.status(201).json({ data: userReview });
  }
}

export default sessionRequestHandler;
