const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

  username: {
    _id: false,
    type: String,
    default: ""
  },
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
  likedEmails: [String],
  dislikedEmails: [String],
  numLikes: Number,
  numDislikes: Number
},
{ collection: "Comment"});


module.exports = mongoose.model("Comment", commentSchema);