import { expect, use, request } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import { signUp, signIn } from '../testDummyData/mockData';
import dbClient from '../../models/database/dbClient';
import { Users } from '../../models/database/dbTables';

use(chaiHttp);


describe('Auth test', () => {
  before((done) => {
    dbClient.then((client) => client.query(Users).then(() => {
    }).catch((error) => console.log(error)));
    done();
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
        expect(res).at.have.status(200);
      });
    done();
  });
});
