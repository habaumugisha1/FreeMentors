import { Sessions } from '../models/myDb';

class dataMiddleware {
  static isAcceptedBefore(req, res, next) {
    const findSession = Sessions.find((session) => session.id === parseInt(req.params.sessionId, 10));
    if (findSession.status === 'accepted') return res.status(409).json({ status: 409, message: 'It has been already accepted' });
    next();
  }
}

export default dataMiddleware;
