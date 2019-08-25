"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(email, users) {
  var existUser = users.find(function (user) {
    return user.email === email;
  });
  if (existUser) return false;
  return true;
};

exports["default"] = _default;