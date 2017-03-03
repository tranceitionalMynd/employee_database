const server_app = require('../app');
const app = server_app.app;
const assert = require('chai').assert;
const request = require('supertest');

// Test asset serving with supertest
describe('assets', () => {
  describe('GET /', () => {
    it('respond with html', (done) => {
      request(app).get('/').set('Accept', 'text/html').expect('Content-Type', /html/).expect(200, done);
    });
  });
  describe('GET /images/favicon.ico', () => {
    it('responds with an image', (done) => {
      request(app).get('/images/favicon.ico').set('Accept', 'image/x-icon').expect('Content-Type', /image/).expect(200, done);
    });
  });
  describe('GET /css/bootstrap.css', () => {
    it('responds with text', (done) => {
      request(app).get('/css/bootstrap.css').set('Accept', 'text').expect('Content-Type', /text/).expect(200, done);
    });
  });
  describe('GET /js/bootstrap.js', () => {
    it('responds with javascript', (done) => {
      request(app).get('/js/bootstrap.js').set('Accept', 'text').expect('Content-Type', 'application/javascript').expect(200, done);
    });
  });
  describe('GET /js/jquery.js', () => {
    it('responds with javascript', (done) => {
      request(app).get('/js/jquery.js').set('Accept', 'text').expect('Content-Type', 'application/javascript').expect(200, done);
    });
  });
});

