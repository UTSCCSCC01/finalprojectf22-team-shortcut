const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({

  code: {
    _id: false,
    type: String,
    required: [true, "Course code required."]
  },
  name: {
    _id: false,
    type: String,
    required: [true, "Course name required."]
  },
  description: String,
  breadth: String,
  exclusions: [String],
  prerequisites: [String],
  corequisites: [String],
  recommended: [String],
  note: String,
  status: String,
  score: { average: Number, num: Number }
},
{ collection: "Course"});


module.exports = mongoose.model("Course", courseSchema);