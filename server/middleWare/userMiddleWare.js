import { verify } from 'jsonwebtoken';

class middleWareHandler {
  static isAdminUser(req, res, next) {
    if (!req.headers.authorization) return res.status(401).json({ error: 'You do not have an account' });
    const token = req.headers.authorization.split(' ')[1];
    const isAdminData = verify(token, 'secretkey');
    req.userData = isAdminData;
    if (isAdminData.isAdmin) return next();
    return res.status(403).json({ error: 'You are not an admin' });
  }

  static canViewAllMentors(req, res, next) {
    if (!req.headers.authorization) return res.status(401).json({ error: 'You do not have an account' });
    const token = req.headers.authorization.split(' ')[1];
    const userData = verify(token, 'secretkey');
    req.userData = userData;
    if (userData.user_role !== 'mentor') return next();
    return res.status(403).json({ error: 'Only users and admin are allowed' });
  }
}

export default middleWareHandler;
