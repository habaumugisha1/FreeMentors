import { expect, use, request } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import { signUp, menteeCredentials, signIn, userRole } from '../testDummyData/mockData';

use(chaiHttp);


describe('Auth test', () => {
  before((done) => {
    request(server).post('/api/v1/auth/signin')
      .send(menteeCredentials).end((err, res) => {
        global.userToken = res.body.data.token;
        done();
      });
   
  });

  it('User signup', (done) => {
    request(server)
      .post('/api/v1/auth/signup')
      .send(signUp)
      .end((err, res) => {
        expect(res).to.have.status(201);
      });
    done();
  });
  it('User signin', (done) => {
    request(server)
      .post('/api/v1/auth/signin')
      .send(signIn).end((err, res) => {
        expect(res).to.have.status(404);
      });
    done();
  });
  it('admin change mentee to mentor', (done) => {
    request(server).patch('/api/v1/user/1')
    .set({ Authorization: `Bearer ${global.userToken}` })
     .send(userRole)
      .end((err, res) => {
        expect(res).to.have.status(201);
      });
    done();
  });
  it('view all mentors', (done) => {
    request(server).get('/api/v1/mentors')
    .set({ Authorization: `Bearer ${global.userToken}` })

       .end((err, res) => {
        expect(res).to.have.status(200);
      });

    done();
  });
  it('view specific mentor', (done) => {
    request(server)
      .get('/api/v1/mentors/1')
      .set({ Authorization: `Bearer ${global.userToken}` })

      .end((err, res) => {
        expect(res).to.have.status(502);
      });
    done();
  });

});
