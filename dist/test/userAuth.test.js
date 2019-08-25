"use strict";

var _chai = require("chai");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _chai.use)(_chaiHttp["default"]);
describe('User controller test', function () {
  it('User signup', function (done) {
    (0, _chai.request)(_server["default"]).post('/api/v1/auth/signup').send({
      firstname: 'nkusi',
      lastname: 'oliver',
      email: 'ok@gmail.com',
      password: 'webapp12',
      address: 'kigali,rwanda',
      bio: 'leoum epasum',
      occupation: 'instructer',
      expertise: 'leadership'
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(201);
      done();
    });
  });
  it('User signin', function (done) {
    (0, _chai.request)(_server["default"]).post('/api/v1/auth/signin').send({
      email: 'ok@gmail.com',
      password: 'webapp12'
    }).end(function (err, res) {
      (0, _chai.expect)(res).at.have.status(201);
      done();
    });
  });
});