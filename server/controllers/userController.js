import { sign } from 'jsonwebtoken';
import Joi from '@hapi/joi';
import bcrypt from 'bcrypt';
import { Users } from '../models/myDb';
import { signUpSchema, signInSchema, profileSchema } from '../helpers/validationSchema';
import userFormat from '../helpers/mentorResponse';
import dbClient from '../models/database/dbClient';
import { SignUpUser, signInUserDb } from '../models/database/dbQueries';

class UserController {
  static singUp(req, res) {
    Joi.validate(req.body, signUpSchema, (err, value) => {
      if (err) return res.status(400).json({ status: 400, error: err.details[0].message });
      bcrypt.hash(value.password, 9, (errs, hashedPassword) => {
        if (errs) return res.status(400).json({ status: 400, error: errs });

        const newUser = {
          firstName: value.firstName,
          lastName: value.lastName,
          email: value.email,
          password: hashedPassword,
          isAdmin: false,
          createdOn: new Date(),
        };
        return dbClient.connect().then((client) => client.query(SignUpUser,
          [newUser.firstName, newUser.lastName, newUser.email, newUser.password, newUser.createdOn])
          .then(() => {
            client.release();
            sign({
              email: newUser.email,
              isAdmin: newUser.isAdmin,
              userRole: newUser.userRole,
              firstName: newUser.firstName,
              lastName: newUser.lastName,
            },
            process.env.SECRET_KEY, (errors, token) => {
              if (errors) return res.status(400).json({ status: 400, err: errs });
              return res.status(201).json({
                status: 201,
                message: 'User created successfully',
                data:
            { token },
              });
            });
          }).catch((error) => res.status(502).json({ status: 502, err: error })));
      });
    });
  }

  static signIn(req, res) {
    Joi.validate(req.body, signInSchema, (err, value) => {
      if (err) return res.status(400).json({ status: 404, error: err.details[0].message });
      return dbClient.connect().then((client) => client.query(signInUserDb, [value.email])
        .then((response) => {
          client.release();
          if (response.rows.length === 0) return res.status(404).json({ status: 404, message: 'User is not found in database' });
          bcrypt.compare(value.password, response.rows[0].password, (errors, data) => {
            if (errors) return res.status(400).json({ status: 400, error: errors });
            if (!data) return res.json({ error: 'Invalid credentials' });
            sign({
              email: response.rows[0].email,
              isAdmin: response.rows[0].isAdmin,
              userRole: response.rows[0].userRole,
              firstName: response.rows[0].firstName,
              lastName: response.rows[0].lastName,
            }, process.env.SECRET_KEY, (errs, token) => {
              if (errs) return res.json({ err: errs });
              return res.status(200).json({
                status: 200,
                message: 'User is successfully logged in',
                data: {
                  token,
                },
              });
            });
          });
        }).catch((errors) => res.status(502).json({ status: 502, dbErr: errors })));
    });
  }

  static changeUserToMentor(req, res) {
    const singleUser = Users.find((user) => user.id === parseInt(req.params.userId, 10));
    if (!singleUser) return res.status(404).json({ status: 404, error: 'user not found' });
    singleUser.userRole = req.body.userRole;
    res.status(201).json({ status: 201, data: userFormat(singleUser) });
  }

  static editUserProfile(req, res) {
    Joi.validate(req.body, profileSchema, (err, value) => {
      if (err) return res.status(400).json({ status: 400, error: err.details[0].message });
      const singleUser = Users.find((user) => user.id === parseInt(req.params.userId, 10));
      if (!singleUser) return res.status(404).json({ status: 404, message: 'User Not found', data: singleUser });
      singleUser.address = value.address;
      singleUser.bio = value.bio;
      singleUser.occupation = value.occupation;
      singleUser.expertise = value.expertise;
      res.status(201).json({ status: 201, data: userFormat(singleUser) });
    });
  }

  static userViewMentors(req, res) {
    const allMentors = [];
    const mentors = Users.filter((mentor) => mentor.userRole === 'mentor');
    mentors.forEach((oneMentor) => {
      allMentors.push(userFormat(oneMentor));
    });
    res.status(200).json({ status: 200, data: allMentors });
  }

  static adminViewUsers(req, res) {
    const allUsers = [];
    const users = Users.filter((user) => user.userRole === 'user');
    users.forEach((oneUser) => {
      allUsers.push(userFormat(oneUser));
    });
    res.status(200).json({ status: 200, data: allUsers });
  }

  static viewSpecificMentor(req, res) {
    const specificMentor = Users.find((mentor) => mentor.id === parseInt(req.params.mentorId, 10) && mentor.userRole === 'mentor');
    if (!specificMentor) return res.status(404).json({ status: 404, error: 'mentor not found' });
    const { password, isAdmin, ...rest } = specificMentor;
    res.status(200).json({ status: 200, data: rest });
  }
}

export default UserController;
