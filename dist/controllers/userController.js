"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _myDb = require("../models/myDb");

var _validationSchema = require("../helpers/validationSchema");

var _userResponse = _interopRequireDefault(require("../helpers/userResponse"));

var _isExist = _interopRequireDefault(require("../helpers/isExist"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: "singUp",
    value: function singUp(req, res) {
      _joi["default"].validate(req.body, _validationSchema.signUpSchema, function (err, value) {
        if (err) res.status(400).json({
          error: err.details[0].message
        });
        if (!(0, _isExist["default"])(value.email, _myDb.Users)) return res.status(400).json({
          error: 'User exist'
        });

        _bcrypt["default"].hash(value.password, 9, function (errs, hashedPassword) {
          if (errs) return res.status(400).json({
            error: errs
          });
          var newUser = {
            id: _myDb.Users.length + 1,
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
            createdOn: new Date()
          };

          _myDb.Users.push(newUser);

          (0, _jsonwebtoken.sign)({
            id: newUser.id,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            user_role: newUser.user_role,
            firstname: newUser.firstname,
            lastname: newUser.lastname
          }, 'secretkey', function (errors, token) {
            if (errors) return res.json({
              err: errs
            });
            newUser.token = token;
            return res.status(201).json({
              data: (0, _userResponse["default"])(newUser)
            });
          });
        });
      });
    }
  }, {
    key: "signIn",
    value: function signIn(req, res) {
      _joi["default"].validate(req.body, _validationSchema.signInSchema, function (err, value) {
        if (err) res.status(400).json({
          error: err.details[0].message
        });

        var signInUser = _myDb.Users.find(function (user) {
          return user.email === value.email;
        });

        if (!signInUser) return res.status(404).json({
          message: 'User not found'
        });

        _bcrypt["default"].compare(value.password, signInUser.password, function (errors, result) {
          if (errors) return res.status(400).json({
            error: errors
          });
          if (!result) return res.json({
            error: 'Invalid credentials'
          });
          (0, _jsonwebtoken.sign)({
            id: signInUser.id,
            email: signInUser.email,
            isAdmin: signInUser.isAdmin,
            user_role: signInUser.user_role,
            firstname: signInUser.firstname,
            lastname: signInUser.lastname
          }, 'secretkey', function (errs, token) {
            if (errs) return res.json({
              err: errs
            });
            signInUser.token = token;
            return res.status(201).json({
              data: (0, _userResponse["default"])(signInUser)
            });
          });
        });
      });
    }
  }, {
    key: "changeUserToMentor",
    value: function changeUserToMentor(req, res) {
      var singleUser = _myDb.Users.find(function (user) {
        return user.id === parseInt(req.params.userId, 10);
      });

      if (!singleUser) return res.status(404).json({
        error: 'user not found'
      });
      singleUser.user_role = req.body.user_role;
      res.status(201).json({
        data: singleUser
      });
    }
  }, {
    key: "userViewMentors",
    value: function userViewMentors(req, res) {
      var mentors = _myDb.Users.filter(function (mentor) {
        return mentor.user_role === 'mentor';
      });

      res.status(200).json({
        data: mentors
      });
    }
  }, {
    key: "adminViewUsers",
    value: function adminViewUsers(req, res) {
      var users = _myDb.Users.filter(function (user) {
        return user.user_role === 'user';
      });

      res.status(200).json({
        data: users
      });
    }
  }, {
    key: "viewSpecificMentor",
    value: function viewSpecificMentor(req, res) {
      var specificMentor = _myDb.Users.find(function (mentor) {
        return mentor.id === parseInt(req.params.mentorId, 10) && mentor.user_role === 'mentor';
      });

      if (!specificMentor) return res.status(404).json({
        error: 'no mentor found'
      });
      res.status(200).json({
        data: specificMentor
      });
    }
  }]);

  return UserController;
}();

var _default = UserController;
exports["default"] = _default;