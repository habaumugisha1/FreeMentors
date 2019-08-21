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
}

export default sessionRequestHandler;
