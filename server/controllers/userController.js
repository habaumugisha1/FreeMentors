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
      user_role: 'user',
      isAdmin: false,
      createdOn: new Date(),
    };
    Users.push(newUser);
    sign({
      id: newUser.id,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      user_role: newUser.user_role,
    },
    'secretkey', (errs, token) => {
      if (errs) return res.json({ err: errs });
      newUser.token = token;
      return res.status(201).json({ data: { firstname: newUser.firstname, lastname: newUser.lastname, token: newUser.token } });
    });
  }

  static signIn(req, res) {
    const signInUser = Users.find((user) => user.email === req.body.email);
    if (!signInUser) return res.status(401).json({ message: 'User not found' });
    sign({
      id: signInUser.id,
      email: signInUser.email,
      isAdmin: signInUser.isAdmin,
      user_role: signInUser.user_role,
    }, 'secretkey', (errs, token) => {
      if (errs) return res.json({ err: errs });
      signInUser.token = token;
      return res.status(201).json({ data: { firstname: signInUser.firstname, lastname: signInUser.lastname, token: signInUser.token } });
    });
  }

  static changeUserToMentor(req, res) {
    const singleUser = Users.find((user) => user.id === parseInt(req.params.userId, 10));
    if (!singleUser) return res.status(404).json({ error: 'user not found' });
    singleUser.user_role = req.body.user_role;
    res.status(201).json({ message: 'user accunt changed to mentor' });
  }

  static userViewMentors(req, res) {
    const mentors = Users.filter((mentor) => mentor.user_role === 'mentor');
    if (mentors.length === 0) return res.status(404).json({ message: 'No mentor found' });
    res.status(200).json({ data: mentors });
  }

  static viewSpecificMentor(req, res) {
    const specificMentor = Users.find((mentor) => mentor.id === parseInt(req.params.mentorId, 10) && mentor.user_role === 'mentor');
    if (!specificMentor) return res.status(404).json({ error: 'no mentor found' });
    res.status(201).json({ data: specificMentor });
  }
}

export default UserController;
