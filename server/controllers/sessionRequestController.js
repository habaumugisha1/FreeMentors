import { Sessions } from '../models/myDb';

class sessionRequestHandler {
  static createSessionRequest(req, res) {
    const newSession = {
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
}

export default sessionRequestHandler;
