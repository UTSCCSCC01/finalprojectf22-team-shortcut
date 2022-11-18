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
    console.log("hello")
    var x = prerequisite;

    if (prerequisite.length == 0) {
        console.log("empty");
        return [true, 'none'];
    }
    if (prerequisite.length == 1) {
        console.log("1 prereq");
        if (Array.isArray(prerequisite[0])) {
            return result = recurser(prerequisite[0], academic_history);
        }
        else {
            if (academic_history.includes(prerequisite[0])) {
                console.log("in history");
                return [true, 'none']
            }
            else return [false, prerequisite];
        }
    }
    
    const logic = prerequisite[0];
    if (logic == 0) {
        console.log("get OR");
        var missing_prerequisites = [];
        for (let i = 1; i < prerequisite.length; i++) {
            const p = prerequisite[i];
            console.log("checking", p)
            if (Array.isArray(p)) {
                const result = recurser(p, academic_history);
                if (!result[0]) missing_prerequisites.push(result[1]);
                else {
                    while (missing_prerequisites.length > 0) missing_prerequisites.pop();
                    break;
                }
            }
            else {
                if (!academic_history.includes(p)) missing_prerequisites.push(p);
                if (academic_history.includes(p)) {
                    while (missing_prerequisites.length > 0) missing_prerequisites.pop();
                    break;
                }
            }
        }
        console.log("return OR", missing_prerequisites);
        if (missing_prerequisites.length == 0) return [true, 'none'];
        if (missing_prerequisites.length == 1) return [false, missing_prerequisites];
        else {
            return [false, [0].concat(missing_prerequisites)];
        }
    }
    else {
        console.log("get AND");
        var missing_prerequisites = [];
        for (let i = 1; i < prerequisite.length; i++) {
            const p = prerequisite[i];
            if (Array.isArray(p)) {
                const result = recurser(p, academic_history);
                if (!result[0]) missing_prerequisites.push(result[1]);
            }
            else {
                if (!academic_history.includes(p)) missing_prerequisites.push(p);
            }
        }
        console.log("return AND", missing_prerequisites);
        if (missing_prerequisites.length == 0) return [true, 'none'];
        if (missing_prerequisites.length == 1) return [false, missing_prerequisites];
        else {
            return [false, [1].concat(missing_prerequisites)];
        }
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

        // for(const prerequisite of course.prerequisites){
            console.log(course.prerequisites);
            result = recurser(course.prerequisites, academic_history);

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
        // }
        
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