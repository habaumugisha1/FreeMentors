import { expect, use, request } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import { signUp, signIn } from '../testDummyData/mockData';

use(chaiHttp);


describe('Auth test', () => {
  it('User signup', (done) => {
    request(server)
      .post('/api/v1/auth/signup')
      .send(signUp)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
  it('User signin', (done) => {
    request(server)
      .post('/api/v1/auth/signin')
      .send(signIn).end((err, res) => {
        expect(res).at.have.status(200);
        done();
      });
  });
});
