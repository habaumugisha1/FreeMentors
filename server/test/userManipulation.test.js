
import { expect, use, request } from 'chai';
import chaiHttp from 'chai-http';
import { before } from 'mocha';
import server from '../server';

use(chaiHttp);
describe('User endpoints', () => {
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
  it('admin change user to mentor', (done) => {
    request(server).patch('/api/v1/user/2')
      .set({ Authorization: `Bearer ${global.userToken}` })
      .send({
        user_role: 'mentor',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('object');
        done();
      });
  });

  it('view all mentors', (done) => {
    request(server).get('/api/v1/mentors')
      .set({ Authorization: `Bearer ${global.userToken}` })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
        done();
      });
  });

  it('view specific mentor', (done) => {
    request(server)
      .get('/api/v1/mentors/3')
      .set({ Authorization: `Bearer ${global.userToken}` })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('object');
        done();
      });
  });
  it('View all users', (done) => {
    request(server)
      .get('/api/v1/users')
      .set({ Authorization: `Bearer ${global.userToken}` })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
        done();
      });
  });
});
