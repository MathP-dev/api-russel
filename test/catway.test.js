const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Catway = require('../models/Catway');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Catway API', () => {
  before(async () => {
    await Catway.deleteMany({});
  });

  it('should create a new catway', (done) => {
    const catway = {
      catwayNumber: 1,
      type: 'short',
      catwayState: 'bon état'
    };
    chai.request(app)
      .post('/catways')
      .send(catway)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should get all catways', (done) => {
    chai.request(app)
      .get('/catways')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});
