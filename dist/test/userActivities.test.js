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
      email: 'mu@gmail.com',
      password: 'webapp12'
    }).end(function (err, res) {
      global.userToken = res.body.data.token;
      done();
    });
  });
  it('User create a session request', function (done) {
    (0, _chai.request)(_server["default"]).post('/api/v1/sessions').set({
      Authorization: "Bearer ".concat(global.userToken)
    }).send({
      mentorId: 3,
      question: 'I need a help on readership'
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(201);
      done();
    });
  });
  it('User specific sessions', function (done) {
    (0, _chai.request)(_server["default"]).get('/api/v1/user/sessions').set({
      Authorization: "Bearer ".concat(global.userToken)
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      done();
    });
  });
  it('User review a session', function (done) {
    (0, _chai.request)(_server["default"]).post('/api/v1/sessions/1/review').set({
      Authorization: "Bearer ".concat(global.userToken)
    }).send({
      score: 3,
      remark: 'was awesome'
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(201);
      done();
    });
  });
});