
import { expect, use, request } from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

use(chaiHttp);


describe('User controller test', () => {
  it('User signup', (done) => {
    request(server)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'nkusi',
        lastname: 'oliver',
        email: 'ok@gmail.com',
        password: 'webapp12',
        address: 'kigali,rwanda',
        bio: 'leoum epasum',
        occupation: 'instructer',
        expertise: 'leadership',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
  it('User signin', (done) => {
    request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'ok@gmail.com',
        password: 'webapp12',
      }).end((err, res) => {
        expect(res).at.have.status(201);
        done();
      });
  });
});
