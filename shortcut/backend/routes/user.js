const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Student = require('../schemas/StudentSchema');

router.post('/edit', bodyParser.json(), async (req, res) => {

    // get the user to be updated
    console.log("Checking database for user...");
    const student = await Student.findById(req.body._id.$oid);
    if (student === null) {
        // debug message
        console.log("User does not exist.");
        // send data to frontend
        res.json({ 'data': req.body, 'result': 0, 'message': 'User does not exist.' });
        res.end();
        return;
    }

    else {
    console.log("Found user!");
    console.log("Current profile:");
    console.log(student);

    // update user profile
    try {
        student.name.data = req.body.name.data;
        student.name.display = req.body.name.display;
        student.password = req.body.password;
        student.email.data = req.body.email.data;
        student.email.display = req.body.email.display;
        student.dateOfBirth.data = req.body.dateOfBirth.data;
        student.dateOfBirth.display = req.body.dateOfBirth.display;
        student.gender.data = req.body.gender.data;
        student.gender.display = req.body.gender.display;
        student.program.data = req.body.program.data;
        student.program.display = req.body.program.display;
        student.description.data = req.body.description.data;
        student.description.display = req.body.description.display;
        await student.save();
    }
    catch(e) {
        console.log(e.message);
        res.json({ 'data': student, 'result': 0, 'message': "New data are invalid." });
        res.end();
        return;
    }
    // send data back to frontend
    res.json({ 'data': student, 'result': 1, 'message': "Successfully updated user's profile." });
    res.end();

    console.log("Updated profile:")
    console.log(await Student.findById(req.body._id.$oid));
    console.log("Successfully updated user's profile.");

    return;
    }
})

router.post('/delete', bodyParser.json(), function(req, res, next) {
    var id = req.body._id.$oid;
    // var id = '"$oid":"6336546fe4297bcdbfe06641"';
    Student.findById(id, function(err, doc) {
        if (err || !doc) {
          res.send('fail');
          return;
        }
        Student.findByIdAndRemove(id).exec();
        res.send('success');
    })
});

module.exports = router;