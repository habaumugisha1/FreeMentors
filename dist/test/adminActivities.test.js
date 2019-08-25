"use strict";

var _chai = require("chai");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _mocha = require("mocha");

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _chai.use)(_chaiHttp["default"]);
describe('User activities', function () {
  (0, _mocha.before)(function (done) {
    (0, _chai.request)(_server["default"]).post('/api/v1/auth/signin').send({
      email: 'eu@gmail.com',
      password: 'webapp12'
    }).end(function (err, res) {
      global.userToken = res.body.data.token;
      done();
    });
  });
  it('Get all sessions and their reviews', function (done) {
    (0, _chai.request)(_server["default"]).get('/api/v1/sessions/reviews').set({
      Authorization: "Bearer ".concat(global.userToken)
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      done();
    });
  });
  it('admin delete session\'s reviews', function (done) {
    (0, _chai.request)(_server["default"])["delete"]('/api/v1/sessions/3/review').set({
      Authorization: "Bearer ".concat(global.userToken)
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      done();
    });
  });
});