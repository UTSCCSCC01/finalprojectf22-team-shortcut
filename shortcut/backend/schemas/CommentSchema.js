const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

  email: {
    _id: false,
    type: String,
    required: [true, "Email required."]
  },
  created: {
    _id: false,
    type: Date,
    default: Date.now()
  },  
  course: {
    _id: false,
    type: String,
    required: [true, "Course required."]
  },
  parent: {
    _id: false,
    type: String,
    default: null
  },
  content: {
    _id: false,
    type: String,
    required: [true, "Content required."]
  }
},
{ collection: "Comment"});


module.exports = mongoose.model("Comment", commentSchema);

