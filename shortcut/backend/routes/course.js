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
    const student = await Student.findOne({ "email.data": req.body.email });
    if (student === null) {
        // debug message
        console.log("User does not exist.");
        // send data to frontend
        res.status(400);
        res.json({ 'data': {'rating': null, 'comment': null}, 
                   'result': 0, 
                   'message': 'User does not exist.' });
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
        res.json({ 'data': {'rating': null, 'comment': null}, 
                   'result': 0, 
                   'message': 'Course does not exist.' });
        return;
    }
    console.log("Found course!");

    // create comment
    const comment = new Comment({ 'email': req.body.email, 
                                  'course': req.body.course, 
                                  'content': req.body.comment, 
                                  'anonymity': req.body.anonymity });
    try {
        await comment.save();
    }
    catch(e) {
        console.log(e);
        // invalid data
        if (e instanceof mongoose.Error.ValidationError) res.status(400);
        // database error
        else res.status(500);
        res.json({ 'data': {'rating': null, 'comment': null}, 
                   'result': 0, 
                   'message': e.message });
        return;
    }

    console.log("New comment:");
    console.log(comment);

    // create rating with new comment
    const rating = new Rating({ 'email': req.body.email, 
                                'created': comment.created, 
                                'course': req.body.course, 
                                'score': req.body.score, 
                                'comment': comment._id.toString(), 
                                'anonymity': req.body.anonymity });
    try {
        await rating.save();
    }
    catch(e) {
        console.log(e);
        if (e instanceof mongoose.Error.ValidationError) res.status(400);
        else res.status(500);
        res.json({ 'data': {'rating': null, 'comment': null}, 
                   'result': 0, 
                   'message': e.message });
        return;
    }

    res.json({ 'data': {'rating': rating, 'comment': comment}, 
               'result': 1, 
               'message': "Successfully posted new rating." });

    console.log("New rating:");
    console.log(rating);

    // update score in course
    course.score.average = (course.score.average * course.score.num + req.body.score) / (course.score.num + 1);
    course.score.num++;
    await course.save();
    console.log("Updated score for course:");
    console.log(course);

    console.log("Successfully posted new rating.");

});

router.post('/course/update/comment', bodyParser.json(), async (req, res) => {
    var emails = [];
    var count = 0;
    const studentCursor = Student.find().cursor();
    for (let doc = await studentCursor.next(); doc != null; doc = await studentCursor.next()) {
        emails.push(doc.email.data);
        console.log(doc.email.data);
    }
    const len = emails.length;

    const commentCursor = Comment.find().cursor();
    for (let doc = await commentCursor.next(); doc != null; doc = await commentCursor.next()) {
        count++;
        var likedEmails = emails.slice(0, count%len);
        var numLikes = count%len;
        var dislikedEmails = emails.slice(count%len, len);
        var numDislikes = len - (count%len);
        console.log(likedEmails, numLikes, dislikedEmails, numDislikes);
        doc.likedEmails = likedEmails;
        doc.dislikedEmails = dislikedEmails;
        await doc.save();
        await Comment.updateOne(doc, {
                                        "numLikes": numLikes,
                                        "numDislikes": numDislikes });
        // await Comment.updateOne(doc, {$unset: {"username": 1}});
        console.log(doc);
    }

    res.end();
    return;
});

router.post('/course/update/course', bodyParser.json(), async (req, res) => {
    var count = 0;

    const courseCursor = await Course.find().cursor();
    for (let doc = await courseCursor.next(); doc != null; doc = await courseCursor.next()) {
        count++;
        await Course.updateOne(doc, { "score": {"average": count%5, "num": 0} });
        console.log(doc);
    }

    res.end();
    return;
});

module.exports = router;