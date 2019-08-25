"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(UserReturnData) {
  return {
    firstname: UserReturnData.firstname,
    lastname: UserReturnData.lastname,
    email: UserReturnData.email,
    token: UserReturnData.token
  };
};

exports["default"] = _default;