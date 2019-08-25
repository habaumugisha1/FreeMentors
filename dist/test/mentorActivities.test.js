"use strict";

var _chai = require("chai");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _mocha = require("mocha");

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _chai.use)(_chaiHttp["default"]);
describe('User activities', function () {
  (0, _mocha.before)(function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/auth/signin').send({
      email: 'ksj@gmail.com',
      password: 'webapp12'
    }).end(function (err, res) {
      global.userToken = res.body.data.token;
      done();
    });
  });
  it('specific mentor sessions', function (done) {
    (0, _chai.request)(_app["default"]).get('/api/v1/mentor/sessions').set({
      Authorization: "Bearer ".concat(global.userToken)
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      done();
    });
  });
  it('Accept a session', function (done) {
    (0, _chai.request)(_app["default"]).patch('/api/v1/sessions/1/accept').set({
      Authorization: "Bearer ".concat(global.userToken)
    }).send({
      status: 'accepted'
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(201);
      done();
    });
  });
  it('Reject a session', function (done) {
    (0, _chai.request)(_app["default"]).patch('/api/v1/sessions/5/accept').set({
      Authorization: "Bearer ".concat(global.userToken)
    }).send({
      status: 'rejected'
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(404);
      done();
    });
  });
});