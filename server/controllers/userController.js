import { sign } from 'jsonwebtoken';
import Joi from '@hapi/joi';
import bcrypt from 'bcrypt';
import { signUpSchema, signInSchema, profileSchema } from '../helpers/validationSchema';
import userFormat from '../helpers/mentorResponse';
import dbClient from '../models/database/dbClient';
import {
  SignUpUser, signInUserDb, editUserProfileDb, specificUser,
  changeUserTomentor, allSameUsers,
  specificMentor, isUserExist,
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
              firstName: response.rows[0].firstname,
              lastName: response.rows[0].lastname,
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
    return dbClient.then((client) => client.query(specificUser, [parseInt(req.params.userId, 10)])
      .then((user) => {
        if (user.rows.length === 0) return res.status(404).json({ status: 404, message: 'User not found in database' });
        return dbClient
          .then((newClient) => newClient.query(changeUserTomentor, [req.body.userRole, user.rows[0].id])
            .then(() => res.status(201).json({ status: 201, data: userFormat(user.rows[0]) })).catch((errors) => res.status(502).json({ status: 502, dbErr: errors })))
          .catch((dberr) => res.status(502).json({ status: 502, dbErr: dberr }));
      }));
  }


  static editUserProfile(req, res) {
    Joi.validate(req.body, profileSchema, (err, value) => {
      if (err) return res.status(400).json({ status: 400, error: err.details[0].message });

      return dbClient.then((client) => client.query(specificUser, [req.params.userId])
        .then((user) => {
          if (user.rows.length === 0) return res.status(404).json({ status: 404, message: 'User not found in database' });
          return dbClient
            .then((newClient) => newClient.query(editUserProfileDb,
              [value.address, value.bio, value.occupation, value.expertise, user.rows[0].id])
              .then(() => res.status(201).json({ status: 201, data: userFormat(user.rows[0]) })).catch((errors) => res.status(502).json({ status: 502, dbErr: errors })))
            .catch((dberr) => res.status(502).json({ status: 502, dbrr: dberr }));
        }));
    });
  }

  static userViewMentors(req, res) {
    return dbClient.then((client) => client.query(allSameUsers, ['mentor'])
      .then((users) => {
        const allMentors = [];
        users.rows.forEach((mentor) => {
          allMentors.push(userFormat(mentor));
        });
        res.status(200).json({ status: 200, data: allMentors });
      }).catch((error) => res.status(502).json({ status: 502, error })));
  }

  static adminViewUsers(req, res) {
    return dbClient.then((client) => client.query(allSameUsers, ['user'])
      .then((users) => {
        const allUsers = [];
        users.rows.forEach((user) => {
          allUsers.push(userFormat(user));
        });
        res.status(200).json({ status: 200, data: allUsers });
      }).catch((error) => res.status(502).json({ status: 502, error })));
  }

  static viewSpecificMentor(req, res) {
    return dbClient.then((client) => client.query(specificMentor, [parseInt(req.params.mentorId, 10), 'mentor'])
      .then((mentor) => {
        res.status(200).json({ status: 200, data: userFormat(mentor.rows[0]) });
      }).catch((dberr) => res.status(502).json({ status: 502, error: dberr })));
  }
}

export default UserController;
