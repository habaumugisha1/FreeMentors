"use strict";

var _chai = require("chai");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _mocha = require("mocha");

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _chai.use)(_chaiHttp["default"]);
describe('User endpoints', function () {
  (0, _mocha.before)(function (done) {
    (0, _chai.request)(_server["default"]).post('/api/v1/auth/signin').send({
      email: 'eu@gmail.com',
      password: 'webapp12'
    }).end(function (err, res) {
      global.userToken = res.body.data.token;
      done();
    });
  });
  it('admin change user to mentor', function (done) {
    (0, _chai.request)(_server["default"]).patch('/api/v1/user/2').set({
      Authorization: "Bearer ".concat(global.userToken)
    }).send({
      user_role: 'mentor'
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(201);
      done();
    });
  });
  it('view all mentors', function (done) {
    (0, _chai.request)(_server["default"]).get('/api/v1/mentors').set({
      Authorization: "Bearer ".concat(global.userToken)
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      done();
    });
  });
  it('view specific mentor', function (done) {
    (0, _chai.request)(_server["default"]).get('/api/v1/mentors/3').set({
      Authorization: "Bearer ".concat(global.userToken)
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      done();
    });
  });
  it('View all users', function (done) {
    (0, _chai.request)(_server["default"]).get('/api/v1/users').set({
      Authorization: "Bearer ".concat(global.userToken)
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      done();
    });
  });
});