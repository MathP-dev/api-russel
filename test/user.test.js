const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require('../model/User');

chai.use(chaiHttp);
const expect = chai.expect;

describe('User API', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    
    // Créer un utilisateur de test pour le login
    const testUser = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'admin'
    });
    await testUser.save();
  });

  it('should register a new user', (done) => {
    const user = {
      name: 'New User',
      email: 'newuser@example.com',
      password: 'admin'
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
      password: 'admin'
    };
    chai.request(app)
      .post('/users/login')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        done();
      });
  });
});
