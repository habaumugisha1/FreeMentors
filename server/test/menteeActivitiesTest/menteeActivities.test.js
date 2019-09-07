import { expect, use, request } from 'chai';
import chaiHttp from 'chai-http';
import { before } from 'mocha';
import server from '../../server';
import {
  menteeCredentials, existSession, newSession, reviewMentor, editReview,
} from '../testDummyData/mockData';

use(chaiHttp);
describe('Mentee activities', () => {
  before((done) => {
    request(server).post('/api/v1/auth/signin')
      .send(menteeCredentials).end((err, res) => {
        global.userToken = res.body.data.token;
        done();
      });
  });
  it('Mentee create a session request', (done) => {
    request(server)
      .post('/api/v1/sessions')
      .set({ Authorization: `Bearer ${global.userToken}` })
      .send(newSession)
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
  it('Mentee specific sessions', (done) => {
    request(server)
      .get('/api/v1/user/sessions')
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

  it('mentee review a session', (done) => {
    request(server)
      .post('/api/v1/sessions/1/review')
      .set({ Authorization: `Bearer ${global.userToken}` })
      .send(reviewMentor)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('object');
        done();
      });
  });
  it('Mentee can edit the review', (done) => {
    request(server)
      .patch('/api/v1/review/1')
      .set({ Authorization: `Bearer ${global.userToken}` })
      .send(editReview)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('object');
        done();
      });
  });
});
