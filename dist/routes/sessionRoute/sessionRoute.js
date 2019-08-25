"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userMiddleWare = _interopRequireDefault(require("../../middleWare/userMiddleWare"));

var _sessionRequestController = _interopRequireDefault(require("../../controllers/sessionRequestController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sessionRoute = _express["default"].Router({
  mergeParams: true
});

sessionRoute.post('/sessions', _userMiddleWare["default"].canViewAllMentors, _sessionRequestController["default"].createSessionRequest);
sessionRoute.get('/user/sessions', _userMiddleWare["default"].canViewAllMentors, _sessionRequestController["default"].userSessions);
sessionRoute.post('/sessions/:sessionId/review', _userMiddleWare["default"].canViewAllMentors, _sessionRequestController["default"].sessionReview);
sessionRoute.get('/mentor/sessions', _userMiddleWare["default"].isMentor, _sessionRequestController["default"].mentorSessions);
sessionRoute.get('/sessions/reviews', _userMiddleWare["default"].isAdminUser, _sessionRequestController["default"].adminAllSessions);
sessionRoute.patch('/sessions/:sessionId/accept', _userMiddleWare["default"].isMentor, _sessionRequestController["default"].acceptSession);
sessionRoute.patch('/sessions/:sessionId/reject', _userMiddleWare["default"].isMentor, _sessionRequestController["default"].rejectSession);
sessionRoute["delete"]('/sessions/:sessionId/review', _userMiddleWare["default"].isAdminUser, _sessionRequestController["default"].deleteSessionReview);
var _default = sessionRoute;
exports["default"] = _default;