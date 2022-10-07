const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  email: {
    _id: false,
    type: {
      data: {
        type: String,
        required: [true, 'Email required.'],
        lowercase: true
        },
      display: {
        type: Boolean,
        default: false
        }
      },
  },
    password: {
        _id: false,
        type: String,
        required: [true, 'Password required.']
    },
    name: {
      _id: false,
      type: { 'data': String, 'display': Boolean },
      default: { 'data': null, 'display': null}
    },
    dateofbirth: {
      _id: false,
      type: {'data': String, 'display': Boolean},
      default: { 'data': null, 'display': null}
    },
    gender: {
      _id: false,
      type: {'data': String, 'display': Boolean},
      default: { 'data': null, 'display': null}
    },
    Program: {
      _id: false,
      type: {'data': String, 'display': Boolean},
      default: { 'data': null, 'display': null}
    },
    Description: {
      _id: false,
      type: {'data': String, 'display': Boolean},
      default: { 'data': null, 'display': null}
    }
},
{ collection: "Student"});

module.exports = mongoose.model("Student", studentSchema);
