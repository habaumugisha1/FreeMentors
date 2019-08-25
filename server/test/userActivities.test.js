
import { expect, use, request } from 'chai';
import chaiHttp from 'chai-http';
import { before } from 'mocha';
import server from '../server';

use(chaiHttp);
describe('User activities', () => {
  before((done) => {
    request(server).post('/api/v1/auth/signin')
      .send({
        email: 'mu@gmail.com',
        password: 'webapp12',
      }).end((err, res) => {
        global.userToken = res.body.data.token;
        done();
      });
  });
  it('User create a session request', (done) => {
    request(server)
      .post('/api/v1/sessions')
      .set({ Authorization: `Bearer ${global.userToken}` })
      .send({
        mentorId: 3,
        question: 'I need a help on readership',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
  it('User specific sessions', (done) => {
    request(server)
      .get('/api/v1/user/sessions')
      .set({ Authorization: `Bearer ${global.userToken}` })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('User review a session', (done) => {
    request(server)
      .post('/api/v1/sessions/1/review')
      .set({ Authorization: `Bearer ${global.userToken}` })
      .send({
        score: 3,
        remark: 'was awesome',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
});
