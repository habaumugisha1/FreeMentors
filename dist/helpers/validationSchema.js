"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUpSchema = exports.signInSchema = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var signInSchema = _joi["default"].object().keys({
  email: _joi["default"].string().email({
    minDomainSegments: 2
  }).required(),
  password: _joi["default"].string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
});

exports.signInSchema = signInSchema;

var signUpSchema = _joi["default"].object().keys({
  email: _joi["default"].string().email({
    minDomainSegments: 2
  }).required(),
  password: _joi["default"].string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  firstname: _joi["default"].string().required(),
  lastname: _joi["default"].string().required(),
  address: _joi["default"].string().required(),
  bio: _joi["default"].string().required(),
  expertise: _joi["default"].string().required(),
  occupation: _joi["default"].string().required()
});

exports.signUpSchema = signUpSchema;