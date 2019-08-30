import { verify } from 'jsonwebtoken';

class middleWareHandler {
  static isAdminUser(req, res, next) {
    if (!req.headers.authorization) return res.status(401).json({ error: 'You are unauthorized user' });
    const token = req.headers.authorization.split(' ')[1];
    let authUser;
    verify(token, process.env.SECRET_KEY, (error, adminData) => {
      if (error) return res.status(401).json(error);
      authUser = adminData;
    });
    req.authUser = authUser;
    if (authUser.isAdmin) return next();
    return res.status(403).json({ error: 'You are not an admin' });
  }

  static isUser(req, res, next) {
    if (!req.headers.authorization) return res.status(401).json({ error: 'You are unauthorized user' });
    const token = req.headers.authorization.split(' ')[1];
    let authUser;
    verify(token, process.env.SECRET_KEY, (error, userData) => {
      if (error) return res.status(401).json(error);
      authUser = userData;
    });
    req.authUser = authUser;
    if (authUser.user_role !== 'mentor') return next();
    return res.status(403).json({ error: 'Only mentees allowed' });
  }


  static isMentor(req, res, next) {
    if (!req.headers.authorization) return res.status(401).json({ error: 'You are unauthorized user' });
    const token = req.headers.authorization.split(' ')[1];
    let authUser;

    verify(token, process.env.SECRET_KEY, (error, mentorData) => {
      if (error) return res.status(401).json(error);
      authUser = mentorData;
    });
    req.authUser = authUser;
    if (authUser.user_role === 'mentor') return next();
    return res.status(403).json({ error: 'Only mentors allowed' });
  }
}

export default middleWareHandler;
