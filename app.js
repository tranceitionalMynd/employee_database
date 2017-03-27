const express = require('express');
const app = express();
const db = require('./db/employee');
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/employees.json', (request, response) => {
  jsonEmployees(db.Employee, response);
});

app.post('/employees.json', (request, response) => {
  var employee = request.body.employee;
  var document = new db.Employee(employee);
  console.log('Got new employee: ' + JSON.stringify(employee));
  if (employee._id) {
    console.log('Employee has id: ' + employee._id);
    db.Employee.findOneAndUpdate({_id: employee._id}, employee, {upsert: true}, (err, document) => {
      if (err) {
        throw err;
      }
      jsonStatus(response, 'ok');
    });
    return;
  }
  document._id = mongoose.Types.ObjectId();
//  error = document.validateSync();
//  if (error) {
//    throw error;
//  }

  document.save((error) => {
    if (error) {
      var errString = error.message;
      for (key in error.errors) {
        err = error.errors[key];
        if (err.message) {
          errString += '. ' + err.message;
        }
      }
      console.log(errString);
      jsonData(response, {'status': 'error', 'error': errString});
//      var data = {'status': 'error', 'error': err.message};
//      console.assert(data.error);
//      console.log('Serving error: ' + JSON.stringify(data));
//      jsonData(response, data);
      return;
    }
    jsonStatus(response, 'ok');
  });
});

app.post('/delete', (request, response) => {
  var id = request.body.id;
  console.log("Deleting employee id: " + id);
  db.Employee.find({_id: id}).remove((err) => {
    if (err) { raise(err); }
    jsonStatus(response, 'ok');
  });

});

app.get('/testEmployees.json', (request, response) => {
  jsonEmployees(db.TestEmployee, response)
});

app.use(express.static(__dirname + '/public/'));

app.get('/', (request, response) => {
  response.render('index.html', {name: 'John'});
});

app.listen(port, () => {
  console.log("Listening on: " + port);
});

function find(model, criteria, next) {
  console.log('retrieving employees');
  model.find(criteria, next);
}

function jsonEmployees(model, response) {
//  model.find({}, "_id", (err, employees) => {
  find(model, {}, (err, employees) => {
    if (err) { throw err; }
    response.json(employees);
  });
}

function jsonData(response, data) {
  response.json(data);
}

function jsonStatus(response, req_status) {
  console.log("Serving status: " + {'status': req_status});
  console.log("Serving status: " + {'status': req_status}.status);
  response.json({'status': req_status});
}

module.exports.app = app;
module.exports.find = find;
