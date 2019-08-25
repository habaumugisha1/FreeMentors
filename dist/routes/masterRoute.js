"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _userRoute = _interopRequireDefault(require("./userRoute/userRoute"));

var _sessionRoute = _interopRequireDefault(require("./sessionRoute/sessionRoute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(app) {
  app.use('/api/v1', _userRoute["default"]);
  app.use('/api/v1', _sessionRoute["default"]);
  app.use(function (err, req, res, next) {
    res.status(err.status || 500).send({
      message: err.message
    });
  });
};

exports["default"] = _default;