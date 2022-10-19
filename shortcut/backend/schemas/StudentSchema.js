const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({

  email: {
    _id: false,
    type: {
      data: {
        type: String,
        required: [true, 'Email required.']
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
      default: { 'data': "", 'display': true}
    },
    dateofbirth: {
      _id: false,
      type: {'data': String, 'display': Boolean},
      default: { 'data': null, 'display': true}
    },
    gender: {
      _id: false,
      type: {'data': String, 'display': Boolean},
      default: { 'data': "", 'display': true}
    },
    Program: {
      _id: false,
      type: {'data': String, 'display': Boolean},
      default: { 'data': "", 'display': true}
    },
    Description: {
      _id: false,
      type: {'data': String, 'display': Boolean},
      default: { 'data': "", 'display': true}
    }
},
{ collection: "Student"});


module.exports = mongoose.model("Student", studentSchema);

