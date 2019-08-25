"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _myDb = require("../models/myDb");

var _sessionRevieRes = _interopRequireDefault(require("../helpers/sessionRevieRes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var sessionRequestHandler =
/*#__PURE__*/
function () {
  function sessionRequestHandler() {
    _classCallCheck(this, sessionRequestHandler);
  }

  _createClass(sessionRequestHandler, null, [{
    key: "createSessionRequest",
    value: function createSessionRequest(req, res) {
      var newSession = {
        id: _myDb.Sessions.length + 1,
        mentorId: req.body.mentorId,
        menteeId: req.userData.id,
        question: req.body.question,
        menteeEmail: req.userData.email,
        status: 'pending'
      };

      _myDb.Sessions.push(newSession);

      res.status(201).json({
        data: newSession
      });
    }
  }, {
    key: "userSessions",
    value: function userSessions(req, res) {
      var allSessions = _myDb.Sessions.filter(function (session) {
        return session.menteeId === req.userData.id;
      });

      res.status(200).json({
        data: allSessions
      });
    }
  }, {
    key: "mentorSessions",
    value: function mentorSessions(req, res) {
      var allSessions = _myDb.Sessions.filter(function (session) {
        return session.mentorId === req.userData.id;
      });

      res.status(200).json({
        data: allSessions
      });
    }
  }, {
    key: "adminAllSessions",
    value: function adminAllSessions(req, res) {
      var sessRev = [];

      _myDb.Sessions.forEach(function (session) {
        sessRev.push((0, _sessionRevieRes["default"])(session));
      });

      res.status(200).json({
        data: sessRev
      });
    }
  }, {
    key: "acceptSession",
    value: function acceptSession(req, res) {
      var singleSession = _myDb.Sessions.find(function (session) {
        return session.id === parseInt(req.params.sessionId, 10);
      });

      if (!singleSession) return res.status(404).json({
        data: singleSession
      });
      singleSession.status = req.body.status;
      res.status(201).json({
        data: singleSession
      });
    }
  }, {
    key: "rejectSession",
    value: function rejectSession(req, res) {
      var singleSession = _myDb.Sessions.find(function (session) {
        return session.id === parseInt(req.params.sessionId, 10);
      });

      if (!singleSession) return res.status(404).json({
        data: singleSession
      });
      singleSession.status = req.body.status;
      res.status(201).json({
        data: singleSession
      });
    }
  }, {
    key: "sessionReview",
    value: function sessionReview(req, res) {
      var singleSession = _myDb.Sessions.find(function (session) {
        return session.id === parseInt(req.params.sessionId, 10);
      });

      if (!singleSession) return res.status(404).json({
        data: singleSession
      });
      if (req.body.score > 5) return res.status(400).json({
        message: 'Score should be 1 up to 5'
      });
      var userReview = {
        id: _myDb.Reviews.length + 1,
        sessionId: req.params.sessionId,
        mentorId: singleSession.mentorId,
        menteeId: singleSession.menteeId,
        score: req.body.score,
        menteeFullName: "".concat(req.userData.firstname, " ").concat(req.userData.lastname),
        remark: req.body.remark
      };

      _myDb.Reviews.push(userReview);

      res.status(201).json({
        data: userReview
      });
    }
  }, {
    key: "deleteSessionReview",
    value: function deleteSessionReview(req, res) {
      var sessionReview = _myDb.Reviews.find(function (review) {
        return review.sessionId === parseInt(req.params.sessionId, 10);
      });

      if (!sessionReview) return res.status(404).json({
        data: sessionReview
      });

      _myDb.Reviews.splice(_myDb.Reviews.indexOf(sessionReview), 1);

      res.status(200).json({
        data: {
          message: 'Review Deleted successfully ',
          review: sessionReview
        }
      });
    }
  }]);

  return sessionRequestHandler;
}();

var _default = sessionRequestHandler;
exports["default"] = _default;