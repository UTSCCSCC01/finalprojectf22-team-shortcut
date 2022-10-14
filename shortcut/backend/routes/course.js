const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bodyParser = require('body-parser');
const Student = require('../schemas/StudentSchema');
const Comment = require('../schemas/CommentSchema');
const Rating = require('../schemas/RatingSchema');
const Course = require('../schemas/CourseSchema');

router.post('/course/rate', bodyParser.json(), async (req, res) => {

    // get the user to be updated
    console.log("Checking database for user...");
    // const student = await Student.findById(req.body._id);
    const student = await Student.findOne({ "email.data": req.body.email });
    // console.log(req.body._id);
    if (student === null || student.name.data != req.body.username) {
        // debug message
        console.log("User does not exist.");
        // send data to frontend
        res.status(400);
        res.json({ 'data': {'username': null, 'rating': null, 'comment': null}, 'result': 0, 'message': 'User does not exist.' });
        return;
    }
    console.log("Found user!");

    // get the course to be rated
    console.log("Checking database for course...");
    const course = await Course.findOne({ "code": req.body.course });
    if (course === null) {
        // debug message
        console.log("Course does not exist.");
        // send data to frontend
        res.status(400);
        res.json({ 'data': {'username': req.body.username, 'rating': null, 'comment': null}, 'result': 0, 'message': 'Course does not exist.' });
        return;
    }
    console.log("Found course!");

    // create comment
    const comment = new Comment({ 'email': req.body.email, 'course': req.body.course, 'content': req.body.comment, 'anonymity': req.body.anonymity });
    try {
        await comment.save();
    }
    catch(e) {
        console.log(e);
        // invalid data
        if (e instanceof mongoose.Error.ValidationError) res.status(400);
        // database error
        else res.status(500);
        res.json({ 'data': {'username': req.body.username, 'rating': null, 'comment': null}, 'result': 0, 'message': e.message });
        return;
    }

    console.log("New comment:");
    console.log(comment);

    // create rating with new comment
    const rating = new Rating({ 'email': req.body.email, 'created': comment.created, 'course': req.body.course, 'score': req.body.score, 'comment': comment._id.toString(), 'anonymity': req.body.anonymity });
    try {
        await rating.save();
    }
    catch(e) {
        console.log(e);
        if (e instanceof mongoose.Error.ValidationError) res.status(400);
        else res.status(500);
        res.json({ 'data': {'username': req.body.username, 'rating': null, 'comment': null}, 'result': 0, 'message': e.message });
        return;
    }

    res.json({ 'data': {'username': req.body.username, 'rating': rating, 'comment': comment}, 'result': 1, 'message': "Successfully posted new rating." });

    console.log("New rating:");
    console.log(rating);

    console.log("Successfully posted new rating.");

});

module.exports = router;