const mongoose = require('mongoose');
const validator = require('validator');
const isEmail = validator.isEmail;

const employeeSchema = mongoose.Schema({
  name: String,
  email: String,//{
//    validate: [ isEmail, 'invalid email' ]
//  },
  birthDate: Date,
  department: String,
  gender: String  
});

const Employee = mongoose.model('Employee', employeeSchema);

mongoose.connect('mongodb://tyler:123456@ds123410.mlab.com:23410/employee_database');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  console.log('Connected to mLab!');
});

module.exports.db = db;
module.exports.Employee = Employee;
