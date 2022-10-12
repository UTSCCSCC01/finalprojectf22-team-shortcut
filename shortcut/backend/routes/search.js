const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
//const Student = require('../schemas/StudentSchema');
const e = require('express');
const { default: mongoose } = require('mongoose');
//const studentSchema = require('../schemas/studentSchema');
router.use(express.json());
var mongo = require('mongodb').MongoClient;
var url = "mongodb+srv://CalebZhang:Zhangkeyuan333@cluster0.lb38qs6.mongodb.net/?retryWrites=true&w=majority";
const bcrypt = require('bcrypt');

//search 
router.post('/search', bodyParser.json(), async(req,res)=>{
    var keywords = req.body.keywords;
        console.log(keywords);
        mongo.connect(url, async(err, db) => {
        var db1 = db.db("ShortCut");
        db1.collection('Course').find({$or:[{name:{$regex:keywords}}, {code:{$regex:keywords}}]}).toArray((err,result) =>{
            if(err) throw err;
            
            res.json(result);

        });

        });
    });





module.exports = router;