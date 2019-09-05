import { expect, use, request } from 'chai';
import chaiHttp from 'chai-http';
import { before } from 'mocha';
import server from '../server';

use(chaiHttp);
describe('User activities', () => {
  before((done) => {
    request(server).post('/api/v1/auth/signin')
      .send({
        email: 'ksj@gmail.com',
        password: 'webapp12',
      }).end((err, res) => {
        global.userToken = res.body.data.token;
        done();
      });
  });


  it('Accept a session', (done) => {
    request(server)
      .patch('/api/v1/sessions/2/accept')
      .set({ Authorization: `Bearer ${global.userToken}` })
      .send({
        status: 'accepted',
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        done();
      });
  });
});
