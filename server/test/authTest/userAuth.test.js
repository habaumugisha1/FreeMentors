import { expect, use, request } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import { signUp, signIn, userRole } from '../testDummyData/mockData';
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
        expect(res).to.have.status(201);
      });
    done();
  });
  it('admin change mentee to mentor', (done) => {
    request(server).patch('/api/v1/user/1')
      .send(userRole)
      .end((err, res) => {
        expect(res).to.have.status(404);
      });
    done();
  });
  it('view all mentors', (done) => {
    request(server).get('/api/v1/mentors')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
      });

    done();
  });
  it('view specific mentor', (done) => {
    request(server)
      .get('/api/v1/mentors/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
      });
    done();
  });
  it('View all users', (done) => {
    request(server)
      .get('/api/v1/users')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
      });
    done();
  });
});
