import { verify } from 'jsonwebtoken';

class middleWareHandler {
  static isAdminUser(req, res, next) {
    if (!req.headers.authorization) return res.status(401).json({ error: 'You do not have an account' });
    const token = req.headers.authorization.split(' ')[1];
    const isAdminData = verify(token, process.env.SECRET_KEY);
    req.userData = isAdminData;
    if (isAdminData.isAdmin) return next();
    return res.status(403).json({ message: 'You are not an admin' });
  }

  static canViewAllMentors(req, res, next) {
    if (!req.headers.authorization) return res.status(401).json({ error: 'You do not have an account' });
    const token = req.headers.authorization.split(' ')[1];
    const userData = verify(token, process.env.SECRET_KEY);
    req.userData = userData;
    if (userData.user_role !== 'mentor') return next();
    return res.status(403).json({ message: 'Only users and admin are allowed' });
  }


  static isMentor(req, res, next) {
    if (!req.headers.authorization) return res.status(401).json({ error: 'You do not have an account' });
    const token = req.headers.authorization.split(' ')[1];
    const userData = verify(token, process.env.SECRET_KEY);
    req.userData = userData;
    if (userData.user_role === 'mentor') return next();
    return res.status(403).json({ message: 'Only mentors allowed' });
  }
}

export default middleWareHandler;
