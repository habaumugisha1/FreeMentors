"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _myDb = require("../models/myDb");

var _default = function _default(session) {
  return {
    question: session.question,
    menteeEmail: session.menteeEmail,
    status: session.status,
    review: _myDb.Reviews.filter(function (review) {
      return review.sessionId === session.id;
    })
  };
};

exports["default"] = _default;