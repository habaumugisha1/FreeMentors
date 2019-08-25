"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = require("body-parser");

var _cors = _interopRequireDefault(require("cors"));

var _allowMethods = _interopRequireDefault(require("allow-methods"));

var _masterRoute = _interopRequireDefault(require("./routes/masterRoute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use((0, _bodyParser.json)());
app.use((0, _allowMethods["default"])(['get', 'post', 'head', 'delete', 'patch'], 'Method Not allowed'));
app.use((0, _bodyParser.urlencoded)({
  extended: true
}));
(0, _masterRoute["default"])(app);
app.listen(3000);
var _default = app;
exports["default"] = _default;