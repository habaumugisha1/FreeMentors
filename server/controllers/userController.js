import { sign } from 'jsonwebtoken';
import Joi from '@hapi/joi';
import bcrypt from 'bcrypt';
import { Users } from '../models/myDb';
import { signUpSchema, signInSchema } from '../helpers/validationSchema';
import userReturn from '../helpers/userResponse';


import existUser from '../helpers/isExist';

class UserController {
  static singUp(req, res) {
    Joi.validate(req.body, signUpSchema, (err, value) => {
      if (err) res.status(400).json({ error: err.details[0].message });
      if (!existUser(value.email, Users)) return res.status(403).json({ error: 'User exist' });
      bcrypt.hash(value.password, 9, (errs, hashedPassword) => {
        if (errs) return res.status(400).json({ error: errs });

        const newUser = {
          id: Users.length + 1,
          firstname: value.firstname,
          lastname: value.lastname,
          email: value.email,
          password: hashedPassword,
          address: value.address,
          bio: value.bio,
          occupation: value.occupation,
          expertise: value.expertise,
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
          firstname: newUser.firstname,
          lastname: newUser.lastname,
        },
        'secretkey', (errors, token) => {
          if (errors) return res.json({ err: errs });
          newUser.token = token;
          return res.status(201).json({ data: userReturn(newUser) });
        });
      });
    });
  }


  static signIn(req, res) {
    Joi.validate(req.body, signInSchema, (err, value) => {
      if (err) res.status(400).json({ error: err.details[0].message });
      const signInUser = Users.find((user) => user.email === value.email);
      if (!signInUser) return res.status(401).json({ message: 'User not found' });


      bcrypt.compare(value.password, signInUser.password, (errors, result) => {
        if (errors) return res.status(400).json({ error: errors });

        sign({
          id: signInUser.id,
          email: signInUser.email,
          isAdmin: signInUser.isAdmin,
          user_role: signInUser.user_role,
          firstname: signInUser.firstname,
          lastname: signInUser.lastname,
        }, 'secretkey', (errs, token) => {
          if (errs) return res.json({ err: errs });
          signInUser.token = token;
          return res.status(201).json({ data: userReturn(signInUser) });
        });
      });
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
    res.status(200).json({ data: mentors });
  }

  static adminViewUsers(req, res) {
    const users = Users.filter((user) => user.user_role === 'user');
    res.status(200).json({ data: users });
  }

  static viewSpecificMentor(req, res) {
    const specificMentor = Users.find((mentor) => mentor.id === parseInt(req.params.mentorId, 10) && mentor.user_role === 'mentor');
    if (!specificMentor) return res.status(404).json({ error: 'no mentor found' });
    res.status(201).json({ data: specificMentor });
  }
}

export default UserController;
