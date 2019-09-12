import Joi from '@hapi/joi';
import sessionResponse from '../helpers/sessionResponse';
import reviewResponse from '../helpers/reviewResponse';
import { sessionSchema } from '../helpers/validationSchema';
import {
  specificMentor,
  createSession,
  getUserSessions,
  getMentorSessions,
  getAllSessions,
  getSpecificSession,
  acceptRejectSession,
  reviewSession,
  updateReview,
  getSpecificReview,
  adminDeleteReview,
} from '../models/database/dbQueries';
import dbClient from '../models/database/dbClient';

class sessionRequestHandler {
  static createSessionRequest(req, res) {
    Joi.validate(req.body, sessionSchema, (err, value) => {
      if (err) return res.status(400).json({ status: 400, error: err.details[0].message });
      return dbClient.then((client) => client.query(specificMentor,
        [parseInt(value.mentorId, 10), 'mentor'])
        .then((mentor) => {
          const newSession = {
            mentorId: mentor.rows[0].id,
            mentorEmail: mentor.rows[0].email,
            menteeEmail: req.authUser.email,
            menteeNames: `${req.authUser.firstName} ${req.authUser.lastName}`,
            question: value.question,
            createdOn: new Date(),
          };
          return dbClient.then((newclient) => newclient.query(createSession,
            [newSession.mentorId, newSession.menteeEmail, newSession.mentorEmail, newSession.menteeNames, newSession.question, newSession.createdOn])
            .then(() => {
              res.status(201).json({ status: 201, message: 'Session created successfully', data: sessionResponse(newSession) });
            }).catch((error) => res.status(502).json({ status: 502, err: error })));
        }).then((error) => res.status(400).json({ status: 400, message: 'bad request', data: error })))
        .catch((querError) => res.status(400).json({ status: 400, message: 'Bad request', data: querError }));
    });
  }


  static userSessions(req, res) {
    return dbClient.then(
      (client) => client.query(getUserSessions, [req.authUser.email])
        .then((sessions) => {
          if (sessions.rows.length === 0) return res.status(404).json({ status: 404, message: 'No session available' });
          res.status(200).json({ status: 200, data: sessions.rows });
        }).catch((dberror) => res.status(400).json({ status: 400, message: 'Bad request', data: dberror })),
    );
  }

  static mentorSessions(req, res) {
    return dbClient.then(
      (client) => client.query(getMentorSessions, [req.authUser.email])
        .then((mentorSessions) => {
          res.status(200).json({ status: 200, data: mentorSessions.rows });
        }).catch((dbError) => res.status(400).json({ status: 400, message: 'Bad request', data: dbError })),
    ).catch((dbError) => res.status(400).json({ status: 400, message: 'Bad request', data: dbError }));
  }

  static adminAllSessions(req, res) {
    return dbClient.then(
      (client) => client.query(getAllSessions)
        .then((sessions) => {
          res.status(200).json({ status: 200, data: sessions.rows });
        }).catch((dberr) => res.status(400).json({ status: 400, message: 'Bad request', data: dberr })),
    );
  }

  static acceptSession(req, res) {
    return dbClient.then((client) => client.query(getSpecificSession, [parseInt(req.params.sessionId, 10)])
      .then((session) => dbClient.then((newclient) => newclient.query(acceptRejectSession, [req.body.status, session.rows[0].id])
        .then(() => {
          res.status(201).json({ status: 201, data: sessionResponse(session.rows[0]) });
        }))).catch((dberr) => res.status(400).json({ status: 400, data: dberr })))
      .catch((queryError) => res.status(400).json({ status: 400, message: 'Bad request', data: queryError }));
  }

  static rejectSession(req, res) {
    return dbClient.then((client) => client.query(getSpecificSession, [parseInt(req.params.sessionId, 10)])
      .then((session) => dbClient.then((newclient) => newclient.query(acceptRejectSession, [req.body.status, session.rows[0].id])
        .then(() => {
          res.status(201).json({ status: 201, data: sessionResponse(session.rows[0]) });
        }).catch((dbError) => res.status(400).json({ status: 400, data: dbError })))))
      .catch((dberr) => res.status(400).json({ status: 400, message: 'Bad request', data: dberr }));
  }

  static sessionReview(req, res) {
    return dbClient.then((client) => client.query(getSpecificSession, [parseInt(req.params.sessionId, 10)])
      .then((session) => {
        const userReview = {
          sessionId: session.rows[0].id,
          mentorId: session.rows[0].mentorid,
          menteeEmail: session.rows[0].menteeemail,
          score: req.body.score,
          remark: req.body.remark,
          createdOn: new Date(),
        };
        return dbClient.then((newClient) => newClient.query(reviewSession,
          [userReview.sessionId, userReview.mentorId, userReview.menteeEmail, userReview.score, userReview.remark, userReview.createdOn])
          .then(() => {
            if (req.body.score > 5 || req.body.score <= 0) return res.status(400).json({ status: 400, message: 'Choose 1 up to 5 please' });
            res.status(201).json({ status: 201, message: 'Review created successfully', data: reviewResponse(userReview) });
          }).catch((error) => res.status(400).json({ status: 400, data: error })));
      }).catch((dberr) => res.status(400).json({ status: 400, message: 'Bad request', data: dberr })));
  }

  static editReview(req, res) {
    return dbClient.then((client) => client.query(getSpecificReview,
      [parseInt(req.params.reviewId, 10)])
      .then((review) => dbClient.then((newClient) => newClient.query(updateReview,
        [req.body.remark, review.rows[0].id])
        .then(() => {
          res.status(201).json({ status: 201, data: reviewResponse(review.rows[0]) });
        }).catch((dberror) => res.status(400).json({ status: 400, data: dberror }))))
      .catch((dberror) => res.status(400).json({ status: 404, message: 'Bad request', data: dberror })));
  }

  static deleteSessionReview(req, res) {
    return dbClient.then((client) => client.query(adminDeleteReview, [parseInt(req.params.sessionId, 10)])
      .then(() => {
        res.status(200).json({ status: 200, message: 'Review Deleted successfully ' });
      }).catch((dberror) => res.status(502).json({ status: 502, message: dberror })));
  }
}

export default sessionRequestHandler;
