import { expect, use, request } from 'chai';
import chaiHttp from 'chai-http';
import { before } from 'mocha';
import server from '../../server';
import { adminCredentials } from '../testDummyData/mockData';

use(chaiHttp);
describe('admin activities', () => {
  before((done) => {
    request(server).post('/api/v1/auth/signin')
      .send(adminCredentials).end((err, res) => {
        global.userToken = res.body.data.token;
        done();
      });
   
  });

  it('View all users', (done) => {
    request(server)
      .get('/api/v1/users')
      .set({ Authorization: `Bearer ${global.userToken}` })
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
    done();
  });

  it('Get all sessions and their reviews', (done) => {
    request(server)
      .get('/api/v1/sessions/reviews')
      .set({ Authorization: `Bearer ${global.userToken}` })
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
    done();
  });

  it('admin delete session\'s reviews', (done) => {
    request(server)
      .delete('/api/v1/sessions/1/review')
      .set({ Authorization: `Bearer ${global.userToken}` })
      .end((err, res) => {
        expect(res).to.have.status(200);
       
      });
    done();
  });


  it('View all users', (done) => {
    request(server)
      .get('/api/v1/users')
      .set({ Authorization: `Bearer ${global.userToken}` })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
      });
    done();
  });
});
