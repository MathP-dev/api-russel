const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Catway = require('../model/Catway');
const User = require('../model/User');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Catway API', () => {
  let authToken;

  before(async () => {
    // Nettoyer la base
    await Catway.deleteMany({});
    await User.deleteMany({});
    
    // Créer un utilisateur de test et récupérer le token
    const user = {
      name: 'Test User',
      email: 'testcatway@example.com',
      password: 'password123'
    };
    
    const registerRes = await chai.request(app)
      .post('/users/register')
      .send(user);
    
    authToken = registerRes.body.token;
  });

  it('should create a new catway', (done) => {
    const catway = {
      catwayNumber: 1,
      type: 'short',
      catwayState: 'bon état'
    };
    chai.request(app)
      .post('/api/catways')
      .send(catway)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should get all catways', (done) => {
    chai.request(app)
      .get('/api/catways')
      .set('Authorization', `Bearer ${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});
