const mongoose = require('mongoose');
const validator = require('validator');

const employeeSchema = mongoose.Schema({
  name: String,
  email: { 
    type: String, 
    unique: true, 
    validate: [
      validator.isEmail, 
      '{VALUE} is an invalid email'
    ]
  },
  birthDate: Date,
  department: String,
  gender: { 
    type: String, 
    validate: [
      (v) => {
        return validator.isIn(v, ['male', 'female']);
      },
      '{VALUE} is an invalid gender.'
    ]
  }
});

const Employee = mongoose.model('Employee', employeeSchema);
const TestEmployee = mongoose.model('TestEmployee', employeeSchema);

mongoose.connect('mongodb://tyler:123456@ds123410.mlab.com:23410/employee_database');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  console.log('Connected to mLab!');
});

module.exports.db = db;
module.exports.Employee = Employee;
module.exports.TestEmployee = TestEmployee;
module.exports.employeeSchema = employeeSchema;
