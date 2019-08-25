"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _userController = _interopRequireDefault(require("../../controllers/userController"));

var _userMiddleWare = _interopRequireDefault(require("../../middleWare/userMiddleWare"));

var _swagger = _interopRequireDefault(require("../../../swagger.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRoute = _express["default"].Router({
  mergeParams: true
});

userRoute.post('/auth/signup', _userController["default"].singUp);
userRoute.post('/auth/signin', _userController["default"].signIn);
userRoute.patch('/user/:userId', _userMiddleWare["default"].isAdminUser, _userController["default"].changeUserToMentor);
userRoute.get('/mentors', _userMiddleWare["default"].canViewAllMentors, _userController["default"].userViewMentors);
userRoute.get('/users', _userMiddleWare["default"].isAdminUser, _userController["default"].adminViewUsers);
userRoute.get('/mentors/:mentorId', _userMiddleWare["default"].canViewAllMentors, _userController["default"].viewSpecificMentor);
userRoute.use('/docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swagger["default"]));
var _default = userRoute;
exports["default"] = _default;