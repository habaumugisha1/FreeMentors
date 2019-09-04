import { expect, use, request } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

use(chaiHttp);
describe('User endpoints', () => {
  it('admin change user to mentor', (done) => {
    request(server).patch('/api/v1/users/profile/1/edit')
      .send({
        address: 'kigali,rwanda',
        bio: 'loarem ipsum',
        occupation: 'HOD',
        expertise: 'food processing',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('object');
        done();
      });
  });
});
