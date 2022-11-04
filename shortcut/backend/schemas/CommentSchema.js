const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  email: {
    _id: false,
    type: String,
    required: [true, "Email required."]
  },
  anonymity: {
    _id: false,
    type: Boolean,
    default: true,
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
  },
  likedEmails: {
    _id: false,
    type: [String],
    default: []
  },
  dislikedEmails: {
    _id: false,
    type: [String],
    default: []
  },
  numLikes: {
    _id: false,
    type: Number,
    default: 0
  },
  numDislikes: {
    _id: false,
    type: Number,
    default: 0
  }
},
{ collection: "Comment"});


module.exports = mongoose.model("Comment", commentSchema);