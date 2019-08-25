"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = require("jsonwebtoken");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var middleWareHandler =
/*#__PURE__*/
function () {
  function middleWareHandler() {
    _classCallCheck(this, middleWareHandler);
  }

  _createClass(middleWareHandler, null, [{
    key: "isAdminUser",
    value: function isAdminUser(req, res, next) {
      if (!req.headers.authorization) return res.status(401).json({
        error: 'You do not have an account'
      });
      var token = req.headers.authorization.split(' ')[1];
      var isAdminData = (0, _jsonwebtoken.verify)(token, 'secretkey');
      req.userData = isAdminData;
      if (isAdminData.isAdmin) return next();
      return res.status(403).json({
        error: 'You are not an admin'
      });
    }
  }, {
    key: "canViewAllMentors",
    value: function canViewAllMentors(req, res, next) {
      if (!req.headers.authorization) return res.status(401).json({
        error: 'You do not have an account'
      });
      var token = req.headers.authorization.split(' ')[1];
      var userData = (0, _jsonwebtoken.verify)(token, 'secretkey');
      req.userData = userData;
      if (userData.user_role !== 'mentor') return next();
      return res.status(403).json({
        error: 'Only users and admin are allowed'
      });
    }
  }, {
    key: "isMentor",
    value: function isMentor(req, res, next) {
      if (!req.headers.authorization) return res.status(401).json({
        error: 'You do not have an account'
      });
      var token = req.headers.authorization.split(' ')[1];
      var userData = (0, _jsonwebtoken.verify)(token, 'secretkey');
      req.userData = userData;
      if (userData.user_role === 'mentor') return next();
      return res.status(403).json({
        error: 'Only mentors allowed'
      });
    }
  }]);

  return middleWareHandler;
}();

var _default = middleWareHandler;
exports["default"] = _default;