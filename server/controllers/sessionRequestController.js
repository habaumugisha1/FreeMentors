import { Sessions } from '../models/myDb';

class sessionRequestHandler {
  static createSessionRequest(req, res) {
    const newSession = {
      id: Sessions.length + 1,
      mentorI: req.body.mentorId,
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
}

export default sessionRequestHandler;
