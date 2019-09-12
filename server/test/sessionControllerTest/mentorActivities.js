import { expect, use, request } from 'chai';
import chaiHttp from 'chai-http';
import { before } from 'mocha';
import server from '../../server';
import { mentorCredentials, acceptSession, rejectSession } from '../testDummyData/mockData';

use(chaiHttp);
describe('Mentor activities', () => {
  before((done) => {
    request(server).post('/api/v1/auth/signin')
      .send(mentorCredentials).end((err, res) => {
        global.userToken = res.body.data.token;
        done();
      });
   
  });

  it('specific mentor sessions', (done) => {
    request(server)
      .get('/api/v1/mentor/sessions')
      .set({ Authorization: `Bearer ${global.userToken}` })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
      });
    done();
  });

  it('Accept a session', (done) => {
    request(server)
      .patch('/api/v1/sessions/1/accept')
      .set({ Authorization: `Bearer ${global.userToken}` })
      .send(acceptSession)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('data');
        expect(res.body).to.be.an('object');
      });
    done();
  });

  it('Reject a session', (done) => {
    request(server)
      .patch('/api/v1/sessions/1/reject')
      .set({ Authorization: `Bearer ${global.userToken}` })
      .send(rejectSession)
      .end((err, res) => {
        expect(res).to.have.status(201);
      });
    done();
  });
});
