const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Student = require('../schemas/StudentSchema');


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