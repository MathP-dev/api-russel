const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Reservation = require('../models/Reservation');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Reservation API', () => {
  before(async () => {
    await Reservation.deleteMany({});
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
      .post('/reservations')
      .send(reservation)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should get all reservations', (done) => {
    chai.request(app)
      .get('/reservations')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});
