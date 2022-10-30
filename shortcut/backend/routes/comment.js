const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bodyParser = require('body-parser');
const Student = require('../schemas/StudentSchema');
const Comment = require('../schemas/CommentSchema');

router.post('/comment', bodyParser.json(), async (req, res) => {

    // get the user to be updated
    console.log("Checking database for user...");
    // const student = await Student.findById(req.body._id);
    const student = await Student.findOne({ "email.data": req.body.email });
    // console.log(req.body._id);
    if (student === null) {
        // debug message
        console.log("User does not exist.");
        // send data to frontend
        res.status(400);
        res.json({ 'data': {'parent-comment': null, 'child-comment': null}, 
                   'result': 0, 
                   'message': 'User does not exist.' });
        return;
    }
    console.log("Found user!");

    // get parent comment
    console.log("Checking database for parent comment...");
    const parent = await Comment.findById(mongoose.Types.ObjectId(req.body.id));
    if (parent === null) {
        console.log("Parent comment with id " + req.body.id + " does not exist.");
        res.status(400);
        res.json({ 'data': {'parent-comment': null, 'child-comment': null}, 
                   'result': 0, 
                   'message': 'Parent does not exist.' });
        return;
    }

    // create comment
    const comment = new Comment({ 'username': req.body.username, 
                                  'email': req.body.email, 
                                  'course': req.body.course, 
                                  'parent': req.body.id,
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
        res.json({ 'data': {'parent-comment': null, 'child-comment': null}, 'result': 0, 'message': e.message });
        return;
    }

    console.log("New comment:");
    console.log(comment);

    res.json({ 'data': {'parent-comment': parent, 'child-comment': comment}, 
               'result': 1, 
               'message': "Successfully posted new comment." });


    console.log("Successfully posted new comment.");

});

module.exports = router;