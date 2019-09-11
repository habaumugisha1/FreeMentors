
import {
  getSpecificSession,
  specificUser,
} from '../models/database/dbQueries';
import dbClient from '../models/database/dbClient';


class dataMiddleware {
  static isAcceptedBefore(req, res, next) {
    return dbClient.then((client) => client.query(getSpecificSession,
      [parseInt(req.params.sessionId, 10)])
      .then((session) => {
        if (session.rows.length === 0) return res.status(404);
        if (session.rows[0].status === 'accepted') return res.status(409).json({ status: 409, message: 'It has been already accepted' });
        if (session.rows[0].status === 'rejected') return res.status(409).json({ status: 409, message: 'It has been already rejected' });
        next();
      }).catch((dbErro) => res.status(502).json({ status: 502, error: dbErro })));
  }

  static isRoleMentor(req, res, next) {
    return dbClient.then((client) => client.query(specificUser,
      [parseInt(req.params.userId, 10)])
      .then((user) => {
        if (user.userrole === 'mentor') return res.status(409).json({ status: 409, message: 'This user is a mentor you allowed to change mentees' });
        next();
      }).catch((dberr) => res.status(502).json({ status: 502, error: dberr })));
  }
}

export default dataMiddleware;
