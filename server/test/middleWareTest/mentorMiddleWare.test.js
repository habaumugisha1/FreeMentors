
import { expect, use, request } from 'chai';
import chaiHttp from 'chai-http';
import { before } from 'mocha';
import server from '../../server';
import { adminCredentials } from '../testDummyData/mockData';

use(chaiHttp);
describe('Mentor middleware', () => {
  before((done) => {
    request(server).post('/api/v1/auth/signin')
      .send(adminCredentials).end((err, res) => {
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
