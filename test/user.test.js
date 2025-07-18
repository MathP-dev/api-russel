const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require('../models/User');

chai.use(chaiHttp);
const expect = chai.expect;

describe('User API', () => {
  before(async () => {
    await User.deleteMany({});
  });

  it('should register a new user', (done) => {
    const user = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };
    chai.request(app)
      .post('/users/register')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should login a user', (done) => {
    const user = {
      email: 'test@example.com',
      password: 'password123'
    };
    chai.request(app)
      .post('/users/login')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        done();
      });
  });
});
