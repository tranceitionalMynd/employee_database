const server_app = require('../app');
const app = server_app.app;
const assert = require('chai').assert;
const request = require('supertest');
const db = require('../db/employee');
const should = require('chai').should();
const extend = require('util')._extend;
const mongoose = require('mongoose');
const ReactTestUtils = require('react-addons-test-utils');
const renderer = ReactTestUtils.createRenderer();

const TestEmployee = db.TestEmployee;

var document = new TestEmployee({name: "Permanent", _id: 1, email: "a@hotmail.com", birthDate: new Date(), department: "IT", gender: "male"});

document.save((err) => {
  ;
});

describe('database', () => {

  before((done) => {
    this.george = new Object();
    this.george.name = "Test George";
    this.george.email = "a@hotmail.com";
    this.george.birthDate = new Date();
    this.george.department = "IT";
    this.george.gender = "male";
    this.document = new TestEmployee({name: this.george.name, email: this.george.email, birthDate: this.george.birthDate, department: this.george.department, gender: this.george.gender});
    this.find = function(criteria, next) {
      app.find(TestEmployee, criteria, next);
      //TestEmployee.find(criteria, next);
    },
    this.document.save(done);
    this.findGeorge = function(done) {
      this.result = Object()
      this.find({ _id: this.document._id}, (err, employees) => {
        if (err) { done(err); }
        this.employees = employees;
        if (this.employees) {
          this.employee = employees[0];
        }
        done();
      });
    },
    this.deleteGeorge = function(done) {
      TestEmployee.find().remove({ _id: this.document._id}, (err) => {
        if (err) { 
          raise(err); 
        }
        done();
      });
    }
  });

  after((done) => {
    this.deleteGeorge(done);
  });

  describe('create', () => {
    it('create an employee', () => {
    });
  });
  describe('read', () => {
    beforeEach((done) => {
      this.findGeorge(done);
    });
    it('find() provides truthy value', () => {
      assert.isOk(this.employees);
    });
    it('find() provides at least one result', () => {
      assert.isAtLeast(this.employees.length, 1);
    });
    it('name matches', () => {
      assert.equal(this.george.name, this.employee.name); 
    });
    it('email matches', () => {
      assert.equal(this.george.email, this.employee.email); 
    });
    it('birth date matches', () => {
      //assert.equal(this.george.birthDate, this.employee.birthDate); 
      assert.equal(0, this.george.birthDate - this.employee.birthDate); 
    });
    it('department  matches', () => {
      assert.equal(this.george.department, this.employee.department); 
    });
    it('gender matches', () => {
      assert.equal(this.george.gender, this.employee.gender); 
    });
  });
  describe('update', () => {
    beforeEach((done) => {
      this.george2 = extend({}, this.george);
      this.george2.name = "Test2 George";
      this.george2.email = "b@hotmail.com";
      now = new Date();
      this.george2.birthDate = now;
      this.george2.birthDate.setDate(now.getDate() + 1);
      this.george2.department = "Janitorial";
      this.george2.gender = "Female";
      TestEmployee.where({ _id: this.document._id }).setOptions({multi: true}).update({name: this.george2.name, email: this.george2.email, birthDate: this.george2.birthDate, department: this.george2.department, gender: this.george2.gender}, (err) => {
        if (err) { done(err); }
        this.findGeorge(done);
      });
    });
    it('updated employee has new name', () => {
      assert.equal(this.employee.name, this.george2.name);
    });
    it('updated employee has new email', () => {
      assert.equal(this.employee.email, this.george2.email);
    });
    it('updated employee has new birth date', () => {
      assert.equal(0, this.employee.birthDate - this.george2.birthDate);
    });
    it('updated employee has new department', () => {
      assert.equal(this.employee.department, this.george2.department);
    });
    it('updated employee has new gender', () => {
      assert.equal(this.employee.gender, this.george2.gender);
    });
  });
  describe('delete', () => {
    it('delete the created employee', (done) => {
      this.deleteGeorge(() => {
        assert.equal(0, this.employees.length);
        done();
      });
    });
  });
  describe('GET /employees.json', () => {
    beforeEach(() => {
      this.response = request(app).get('/employees.json');
    });
    it('responds with json', (done) => {
      this.response.set('Accept', 'text').expect('Content-Type', /application\/json/).expect(200, done);
    });
    it('has name', (done) => {
      this.response.then((response) => {
        assert.isOk(response.body.name);
        done();
       });
    });
    it('has jerky', (done) => {
      this.response.then((response) => {
        assert.isOk(response.body.jerky); 
        done();
      });
    });
  });
});

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

describe('front-end', () => {
  describe('employees', () => {
  });
});
