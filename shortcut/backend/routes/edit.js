const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bodyParser = require('body-parser');
const Student = require('../schemas/StudentSchema');

router.post('/edit', bodyParser.json(), async (req, res) => {

    // get the user to be updated
    console.log("Checking database for user...");
    // const student = await Student.findById(req.body._id);
    const student = await Student.findOne({ "email.data": req.body.email.data });
    // console.log(req.body._id);
    if (student === null) {
        // debug message
        console.log("User does not exist.");
        // send data to frontend
        res.status(400);
        res.json({ 'data': req.body, 'result': 0, 'message': 'User does not exist.' });
        return;
    }

    // // validate email
    // const dups = await Student.find( {"email.data": req.body.email.data});
    // console.log(dups);
    // console.log(dups[0]._id.toString());
    // console.log(req.body._id);
    // if (dups.length > 1 || 
    //     (dups.length === 1 && dups[0]._id.toString === req.body._id)) {
    //     res.status(400);
    //     res.json({ 'data': req.body, 'result': 0, 'message': 'Email address is already in use.' });
    //     return;
    // }

    // // validate password
    // if (req.body.password.length < 6) {
    //     res.status(400);
    //     res.json({ 'data': req.body, 'result': 0, 'message': 'Password must contain at least 6 characters.' });
    //     return;
    // }
    // if (req.body.password.search(/\d/) === -1) {
    //     res.status(400);
    //     res.json({ 'data': req.body, 'result': 0, 'message': 'Password must contain digits.' });
    //     return;
    // }
    // if (req.body.password.search(/[a-zA-Z]/) === -1) {
    //     res.status(400);
    //     res.json({ 'data': req.body, 'result': 0, 'message': 'Password must contain alphabets.' });
    //     return;
    // }

    console.log("Found user!");
    console.log("Current profile:");
    console.log(student);
  
    // update user profile
    try {
        student.name.data = req.body.name.data;
        student.name.display = req.body.name.display;
        // student.password = await bcrypt.hash(req.body.password, 10);
        student.email.data = req.body.email.data;
        student.email.display = req.body.email.display;
        student.dateofbirth.data = req.body.dateofbirth.data;
        student.dateofbirth.display = req.body.dateofbirth.display;
        student.gender.data = req.body.gender.data;
        student.gender.display = req.body.gender.display;
        student.Program.data = req.body.Program.data;
        student.Program.display = req.body.Program.display;
        student.Description.data = req.body.Description.data;
        student.Description.display = req.body.Description.display;
        await student.save();
    }
    catch(e) {
        console.log(e.message);
        if (e instanceof mongoose.Error.ValidationError) {
            res.status(400);
            res.json({ 'data': student, 'result': 0, 'message': e.message });
        }
        else {
            res.status(500);
            console.log(e);
            res.json({ 'data': student, 'result': 0, 'message': e.message });
        }
        return;
    }
    // send data back to frontend
    res.json({ 'data': student, 'result': 1, 'message': "Successfully updated user's profile." });

    console.log("Updated profile:")
    // console.log(await Student.findById(req.body._id));
    console.log(await Student.findOne({ "email.data": req.body.email.data }))
    console.log("Successfully updated user's profile.");

    return;
});

module.exports = router;