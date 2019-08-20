import { sign } from 'jsonwebtoken';
import { Users } from '../models/myDb';

class UserController {
  static singUp(req, res) {
    const newUser = {
      id: Users.length + 1,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      bio: req.body.bio,
      occupation: req.body.occupation,
      expertise: req.body.expertise,
      createdOn: new Date(),
    };
    Users.push(newUser);
    sign({ id: newUser.id, email: newUser.email },
      'secretkey', (errs, token) => {
        if (errs) return res.json({ message: errs });
        newUser.token = token;
        return res.status(200).json({ data: { firstname: newUser.firstname, lastname: newUser.lastname, token: newUser.token } });
      });
  }
}

export default UserController;
