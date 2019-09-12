import { verify } from 'jsonwebtoken';
import { isUserExist } from '../models/database/dbQueries';
import dbClient from '../models/database/dbClient';

class middleWareHandler {
  static isAdminUser(req, res, next) {
    if (!req.headers.authorization) return res.status(401).json({ error: 'You are unauthorized user' });
    const token = req.headers.authorization.split(' ')[1];
    let authUser;
    verify(token, process.env.SECRET_KEY, (error, adminData) => {
      if (error) return res.status(401).json({ status: 401, message: error });
      authUser = adminData;
    });
    req.authUser = authUser;
    return dbClient.then((client) => client.query(isUserExist, [authUser.email])
      .then((user) => {
        if (user.rows[0].isadmin) return next();
        res.status(403).json({ status: 403, error: 'only admin allowed' });
      }).catch((error) => res.status(502).json({ status: 502, dbErr: error })));
  }

  static isUser(req, res, next) {
    if (!req.headers.authorization) return res.status(401).json({ error: 'You are unauthorized user' });
    const token = req.headers.authorization.split(' ')[1];
    let authUser;
    verify(token, process.env.SECRET_KEY, (error, userData) => {
      if (error) return res.status(401).json({ status: 401, message: error });
      authUser = userData;
    });
    req.authUser = authUser;
    return dbClient.then((client) => client.query(isUserExist, [authUser.email])
      .then((user) => {
        if (user.rows[0].userrole === 'user') return next();
        res.status(403).json({ status: 403, error: 'only mentees allowed' });
      }).catch((error) => res.status(502).json({ status: 502, dbErr: error })))
      .catch((err) => res.status(502).json({ status: 502, error: err }));
  }

  static isMentor(req, res, next) {
    if (!req.headers.authorization) return res.status(401).json({ status: 401, error: 'You are unauthorized user' });
    const token = req.headers.authorization.split(' ')[1];
    let authUser;

    verify(token, process.env.SECRET_KEY, (error, mentorData) => {
      if (error) return res.status(401).json({ status: 401, message: error });
      authUser = mentorData;
    });
    req.authUser = authUser;
    return dbClient.then((client) => client.query(isUserExist, [authUser.email])
      .then((user) => {
        if (user.rows[0].userrole === 'mentor') return next();
        res.status(403).json({ status: 403, error: 'only mentors allowed' });
      }).catch((error) => res.status(502).json({ status: 502, dbErr: error })))
      .catch((err) => res.status(502).json({ status: 502, error: err }));
  }
}

export default middleWareHandler;
