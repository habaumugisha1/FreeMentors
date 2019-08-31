
import { expect, use, request } from 'chai';
import chaiHttp from 'chai-http';
import { before } from 'mocha';
import server from '../server';

use(chaiHttp);
describe('User activities', () => {
  before((done) => {
    request(server).post('/api/v1/auth/signin')
      .send({
        email: 'eu@gmail.com',
        password: 'webapp12',
      }).end((err, res) => {
        global.userToken = res.body.data.token;
        done();
      });
  });

  it('specific mentor sessions', (done) => {
    request(server)
      .get('/api/v1/mentor/sessions')
      .set({ Authorization: `Bearer ${global.userToken}` })
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });
});
