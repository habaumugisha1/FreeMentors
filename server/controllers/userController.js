import { sign } from 'jsonwebtoken';
import { Users } from '../models/myDb';
import userApi from '../routes/userRoute/userEndPoint';

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
        if (errs) return res.json({ err: errs });
        newUser.token = token;
        return res.status(200).json({ data: { firstname: newUser.firstname, lastname: newUser.lastname, token: newUser.token } });
      });
  }

  static signIn(req, res) {
    const signInUser = Users.find((user) => user.email === req.body.email);
    if (!signInUser) return res.status(401).json({ message: 'User not found' });
    sign({ id: signInUser.id, email: signInUser.email }, 'secretkey', (errs, token) => {
      if (errs) return res.json({ err: errs });
      signInUser.token = token;
      return res.status(201).json({ data: { firstname: signInUser.firstname, lastname: signInUser.lastname, token: signInUser.token } });
    });
  }
}

export default UserController;
