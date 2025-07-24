const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Reservation = require('../model/Reservation');
const User = require('../model/User');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Reservation API', () => {
  let authToken;

  before(async () => {
    // Nettoyer la base
    await Reservation.deleteMany({});
    await User.deleteMany({});
    
    // Créer un utilisateur de test et récupérer le token
    const user = {
      name: 'Test User',
      email: 'testreservation@example.com',
      password: 'password123'
    };
    
    const registerRes = await chai.request(app)
      .post('/users/register')
      .send(user);
    
    authToken = registerRes.body.token;
  });

  it('should create a new reservation', (done) => {
    const reservation = {
      catwayNumber: 1,
      clientName: 'Thomas Martin',
      boatName: 'Carolina',
      checkIn: '2022-05-21T06:00:00Z',
      checkOut: '2022-10-27T06:00:00Z'
    };
    chai.request(app)
      .post('/api/reservations')
      .send(reservation)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should get all reservations', (done) => {
    chai.request(app)
      .get('/api/reservations')
      .set('Authorization', `Bearer ${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});
