import { expect, use, request } from 'chai';
import chaiHttp from 'chai-http';
import { before } from 'mocha';
import server from '../../server';
import {
  newSession, acceptSession, rejectSession, mentorCredentials,
} from '../testDummyData/mockData';

use(chaiHttp);
describe('Data middleware', () => {
  before((done) => {
    request(server).post('/api/v1/auth/signin')
      .send(mentorCredentials).end((err, res) => {
        global.userToken = res.body.data.token;
        done();
      });
  });


  it('accepted already a session', (done) => {
    request(server)
      .patch('/api/v1/sessions/2/accept')
      .set({ Authorization: `Bearer ${global.userToken}` })
      .send(acceptSession)
      .end((err, res) => {
        expect(res).to.have.status(409);
        done();
      });
  });
});
