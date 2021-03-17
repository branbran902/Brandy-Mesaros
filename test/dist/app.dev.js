"use strict";

var request = require('supertest');

var app = require('../app.js');

describe('GET /', function () {
  it('should return 200 OK', function (done) {
    request(app).get('/').expect(200, done);
  });
});
describe('GET /login', function () {
  it('should return 200 OK', function (done) {
    request(app).get('/login').expect(200, done);
  });
});
describe('GET /signup', function () {
  it('should return 200 OK', function (done) {
    request(app).get('/signup').expect(200, done);
  });
});
describe('GET /forgot', function () {
  it('should return 200 OK', function (done) {
    request(app).get('/forgot').expect(200, done);
  });
});
describe('GET /api', function () {
  it('should return 200 OK', function (done) {
    request(app).get('/api').expect(200, done);
  });
});
describe('GET /contact', function () {
  it('should return 200 OK', function (done) {
    request(app).get('/contact').expect(200, done);
  });
});
describe('GET /api/lastfm', function () {
  it('should return 200 OK', function (done) {
    request(app).get('/api/lastfm').expect(200, done);
  });
});
describe('GET /api/twilio', function () {
  it('should return 200 OK', function (done) {
    request(app).get('/api/twilio').expect(200, done);
  });
});
describe('GET /api/stripe', function () {
  it('should return 200 OK', function (done) {
    request(app).get('/api/stripe').expect(200, done);
  });
});
describe('GET /api/scraping', function () {
  it('should return 200 OK', function (done) {
    request(app).get('/api/scraping').expect(200, done);
  });
});
describe('GET /api/lob', function () {
  it('should return 200 OK', function (done) {
    request(app).get('/api/lob').expect(200, done);
  });
});
describe('GET /api/upload', function () {
  it('should return 200 OK', function (done) {
    request(app).get('/api/upload').expect(200, done);
  });
});
describe('GET /random-url', function () {
  it('should return 404', function (done) {
    request(app).get('/reset').expect(404, done);
  });
});
describe('GET /about', function () {
  it('should return 200 OK', function (done) {
    request(app).get('/about').expect(200, done);
  });
});
describe('GET /why-host', function () {
  it('should return 200 OK', function (done) {
    request(app).get('/why-host').expect(200, done);
  });
});