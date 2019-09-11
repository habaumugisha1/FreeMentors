import { sign } from 'jsonwebtoken';
import Joi from '@hapi/joi';
import bcrypt from 'bcrypt';
import { signUpSchema, signInSchema, profileSchema } from '../helpers/validationSchema';
import userFormat from '../helpers/mentorResponse';
import dbClient from '../models/database/dbClient';
import {
  SignUpUser, signInUserDb, isUserExist,
} from '../models/database/dbQueries';


class UserController {
  static singUp(req, res) {
    Joi.validate(req.body, signUpSchema, (err, value) => {
      if (err) return res.status(400).json({ status: 400, error: err.details[0].message });
      return dbClient.then((client) => client.query(isUserExist,
        [value.email])
        .then((user) => {
          if (user.rows.length > 0) return res.status(409).json({ status: 409, message: 'User Exist in the database' });
          bcrypt.hash(value.password, 9, (errs, hashedPassword) => {
            if (errs) return res.status(400).json({ status: 400, error: errs });
            return dbClient.then((newClient) => newClient.query(SignUpUser,
              [value.firstName, value.lastName, value.email, hashedPassword, new Date()])
              .then(() => {
                sign({
                  email: value.email,
                  isAdmin: value.isAdmin,
                  userRole: 'user',
                  firstName: value.firstName,
                  lastName: value.lastName,
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
        }).catch((dberr) => res.status(502).json({ status: 502, error: dberr })));
    });
  }

  static signIn(req, res) {
    Joi.validate(req.body, signInSchema, (err, value) => {
      if (err) return res.status(400).json({ status: 404, error: err.details[0].message });
      return dbClient.then((client) => client.query(signInUserDb, [value.email])
        .then((response) => {
          if (response.rows.length === 0) return res.status(404).json({ status: 404, message: 'User is not found in database' });
          bcrypt.compare(value.password, response.rows[0].password, (errors, data) => {
            if (errors) return res.status(400).json({ status: 400, error: errors });
            if (!data) return res.json({ status: 400, error: data });
            sign({
              email: response.rows[0].email,
              isAdmin: response.rows[0].isadmin,
              userRole: response.rows[0].userrole,
              firstName: response.rows[0].firstrame,
              lastName: response.rows[0].lastrame,
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
