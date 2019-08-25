import { sign } from 'jsonwebtoken';
import Joi from '@hapi/joi';
import bcrypt from 'bcrypt';
import { Users } from '../models/myDb';
import { signUpSchema, signInSchema } from '../helpers/validationSchema';
import userReturn from '../helpers/userResponse';
import userFormat from '../helpers/mentorResponse';


import existUser from '../helpers/isExist';

class UserController {
  static singUp(req, res) {
    Joi.validate(req.body, signUpSchema, (err, value) => {
      if (err) res.status(400).json({ error: err.details[0].message });
      if (!existUser(value.email, Users)) return res.status(400).json({ error: 'User exist' });
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
        process.env.SECRET_KEY, (errors, token) => {
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
      if (!signInUser) return res.status(404).json({ message: 'User not found' });


      bcrypt.compare(value.password, signInUser.password, (errors, result) => {
        if (errors) return res.status(400).json({ error: errors });
        if (!result) return res.json({ error: 'Invalid credentials' });
        sign({
          id: signInUser.id,
          email: signInUser.email,
          isAdmin: signInUser.isAdmin,
          user_role: signInUser.user_role,
          firstname: signInUser.firstname,
          lastname: signInUser.lastname,
        }, process.env.SECRET_KEY, (errs, token) => {
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
    res.status(201).json({ data: userFormat(singleUser) });
  }

  static userViewMentors(req, res) {
    const allMentors = [];
    const mentors = Users.filter((mentor) => mentor.user_role === 'mentor');
    mentors.forEach((oneMentor) => {
      allMentors.push(userFormat(oneMentor));
    });
    res.status(200).json({ data: allMentors });
  }

  static adminViewUsers(req, res) {
    const allUsers = [];
    const users = Users.filter((user) => user.user_role === 'user');
    users.forEach((oneUser) => {
      allUsers.push(userFormat(oneUser));
    });
    res.status(200).json({ data: allUsers });
  }

  static viewSpecificMentor(req, res) {
    const specificMentor = Users.find((mentor) => mentor.id === parseInt(req.params.mentorId, 10) && mentor.user_role === 'mentor');
    if (!specificMentor) return res.status(404).json({ error: 'no mentor found' });
    res.status(200).json({ data: userFormat(specificMentor) });
  }
}

export default UserController;
