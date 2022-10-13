const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({

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
  score: {
    _id: false,
    type: Number,
    required: [true, "Score required."]
  },
  comment: {
    _id: false,
    type: String,
    required: [true, "Comment required."]
  }
},
{ collection: "Rating"});


module.exports = mongoose.model("Rating", ratingSchema);

