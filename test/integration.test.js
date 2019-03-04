'use strict';
const server = require('../server');

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();


chai.use(chaiHttp);

describe('Integration Tests', function() {

  it('GET / should return 200', (done) => {
    chai.request(server)
      .get('/')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });

  describe('/results', () => {
    it('GET should return 200', (done) => {
      chai.request(server)
        .get('/results')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('POST with data should return 200', (done) => {
      chai.request(server)
        .post('/results')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({ 'wellHeight': 6, 'initialClimb': 3, 'nightlySlide': 1, 'fatigue': 10 })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('POST without data should return 400 error', (done) => {
      chai.request(server)
        .post('/results')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('POST should return JSON in the expected format', (done) => {
      chai.request(server)
        .post('/results')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({ 'wellHeight': 6, 'initialClimb': 3, 'nightlySlide': 1, 'fatigue': 10 })
        .end((err, res) => {
          chai.expect(res.body).to.contain.keys(
            'time', 'wellHeight', 'initialClimb', 'nightlySlide',
            'fatigue', 'result', 'distanceClimbed', 'daysToComplete'
          );
          done();
        });
    });

    it('POST should return the correct results ', (done) => {
      chai.request(server)
        .post('/results')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({ 'wellHeight': 6, 'initialClimb': 3, 'nightlySlide': 1, 'fatigue': 10 })
        .end((err, res) => {
          // in a perfect world should be a unit test
          chai.expect(res.body.result).to.equal('Success on day 3');
          chai.expect(res.body.distanceClimbed).to.equal(8.1);
          chai.expect(res.body.daysToComplete).to.equal(3);
          done();
        });
    });

  });

  describe('/results/aggregate', () => {
    it('GET should return 200', (done) => {
      chai.request(server)
        .get('/results/aggregate')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/logs', () => {
    it('GET should return 200', (done) => {
      chai.request(server)
        .get('/logs')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

});