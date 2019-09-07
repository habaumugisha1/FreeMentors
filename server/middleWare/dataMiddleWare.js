import { Sessions, Users } from '../models/myDb';

class dataMiddleware {
  static isAcceptedBefore(req, res, next) {
    const findSession = Sessions.find((acceptedSession) => acceptedSession.id === parseInt(req.params.sessionId, 10));
    if (!findSession) return res.status(404);
    if (findSession.status === 'accepted') return res.status(409).json({ status: 409, message: 'It has been already accepted' });
    if (findSession.status === 'rejected') return res.status(409).json({ status: 409, message: 'It has been already rejected' });
    next();
  }

  static isrejectedBefore(req, res, next) {
    const findSessionRejected = Sessions.find((rejectedSession) => rejectedSession.id === parseInt(req.params.sessionId, 10));
    if (!findSessionRejected) return res.status(404);
    if (findSessionRejected.status === 'rejected') return res.status(409).json({ status: 409, message: 'It has been already rejected' });
    if (findSessionRejected.status === 'accepted') return res.status(409).json({ status: 409, message: 'It has been already accepted' });
    next();
  }

  static isRoleMentor(req, res, next) {
    const mentee = Users.find((user) => user.id === parseInt(req.params.userId, 10));
    if (!mentee) return res.status(404);
    if (mentee.user_role === 'mentor') return res.status(409).json({ status: 409, message: 'This user is a mentor you allowed to change mentees' });
    next();
  }
}

export default dataMiddleware;
