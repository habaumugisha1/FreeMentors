import { expect, use, request } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import { editProfile } from '../testDummyData/mockData';

use(chaiHttp);
describe('User should edit profile', () => {
  it('Updata you profile infor mation', (done) => {
    request(server).patch('/api/v1/users/profile/1/edit')
      .send(editProfile)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('object');
        done();
      });
  });
});
