import { verify } from 'jsonwebtoken';

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
    if (!authUser.isAdmin) return next();
    return res.status(403).json({ status: 403, error: 'only admin allowed' });
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
    if (authUser.userRole === 'user') return next();
    return res.status(403).json({ status: 403, error: 'Only mentees allowed' });
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
    if (authUser.userRole === 'mentor') return next();
    return res.status(403).json({ status: 403, error: 'Only mentors allowed' });
  }
}

export default middleWareHandler;
