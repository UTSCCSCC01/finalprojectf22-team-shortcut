const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const e = require('express');
const { default: mongoose } = require('mongoose');
//const studentSchema = require('../schemas/studentSchema');
router.use(express.json());
var mongo = require('mongodb').MongoClient;
var url = "mongodb+srv://CalebZhang:Zhangkeyuan333@cluster0.lb38qs6.mongodb.net/?retryWrites=true&w=majority";



function recurser(prerequisite, academic_history){
    var x = prerequisite;

    if(Array.isArray(x) == false){
        if(academic_history.includes(x)){
            return [true, 'none'];
        }
        else{
            return [false, x];
        }
    }
    else if(Array.isArray(x)){
        if(x[0] == 0){
            var r1 = recurser(x[1], academic_history);
            var r2 = recurser(x[2], academic_history);

            if(Array.isArray(r1) == false || Array.isArray(r2) == false){
                return [false, 'failure'];
            }
            else{
                if(r1[1] == 'failure' || r2[1] == 'failure'){
                    return [false, 'failure'];
                }
                if(r1[0] == false && r2[0] == false){
                    var missing_prerequisites = [];
                    
                    missing_prerequisites.push(0);
                    missing_prerequisites.push(r1[1]);
                    missing_prerequisites.push(r2[1]);
    
                    return [false, missing_prerequisites];
                }
                else{
                    return [true, 'none'];
                }
            }
        }
        else if(x[0] == 1){
            var r1 = recurser(x[1], academic_history);
            var r2 = recurser(x[2], academic_history);

            if(Array.isArray(r1) == false || Array.isArray(r2) == false){
                return [false, 'failure'];
            }
            else{
                if(r1[1] == 'failure' || r2[1] == 'failure'){
                    return [false, 'failure'];
                }
                if(r1[0] == false && r2[0] == false){
                    var missing_prerequisites = [];
    
                    missing_prerequisites.push(1);
                    missing_prerequisites.push(r1[1]);
                    missing_prerequisites.push(r2[1]);
    
                    return [false, missing_prerequisites];
                }
                else if(r1[0] == false || r2[0] == false){
                    var missing_prerequisites = [];
    
                    if(r1[0] == false){
                        missing_prerequisites.push(r1[1]);
                    }
                    if(r2[0] == false){
                        missing_prerequisites.push(r2[1]);
                    }
    
                    return [false, missing_prerequisites];
                }
                else{
                    return [true, 'none'];
                }
            }
        }
    }
    else{
        return [false, 'failure'];
    }
}

router.post('/checkPrerequisites', bodyParser.json(), async (req, res) => {
    var key = req.body.code;
    var empty_list = [];
    var academic_history = req.body.student_academic_history;
    
    if(academic_history.includes(key)){
        res.json({ 'result': 3, 'Prerequisites': empty_list, 'message': 'User has already took this course or exclusions of this course.' });
        res.end();
        return;
    }

    mongo.connect(url, async(err, db) => {
        if (err){
          res.json({ 'result': 0, 'Prerequisites': empty_list, 'message': 'Error.' });
          res.end();
          return;
        }
        
        var db1 = db.db("ShortCut");
        var course;

        course = await db1.collection('Course').findOne({"code": { $eq: key }});

        if(!course){
            res.json({ 'result': 0, 'Prerequisites': empty_list, 'message': 'Error.' });
            res.end();
            return;
        }

        for(const exclusion of course.exclusions){
            if(academic_history.includes(exclusion)){
                res.json({ 'result': 3, 'Prerequisites': empty_list, 'message': 'User has already took this course or exclusions of this course.' });
                res.end();
                return;
            }
        }

        var missing_prerequisites = [];
        var pass = 1;
        var result = [];

        for(const prerequisite of course.prerequisites){
            result = recurser(prerequisite, academic_history);

            if (Array.isArray(result)) {
                if(result[1] == 'failure'){
                    res.json({ 'result': 0, 'Prerequisites': empty_list, 'message': 'Error.' });
                    res.end();
                    return;
                }
                else if(result[0] == false){
                    missing_prerequisites.push(result[1]);
                    pass = 0;
                }
            }
        }
        
        if(pass == 1){
            res.json({ 'result': 1, 'Prerequisites': missing_prerequisites, 'message': 'User is able to take this course.' });
            res.end();
        }
        else{
            res.json({ 'result': 2, 'Prerequisites': missing_prerequisites, 'message': 'User is missing prerequisites to take this course.' });
            res.end();
        }
        db.close();
        
    });

});
module.exports = router;