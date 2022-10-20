const express = require('express');
const router = express.Router();
const e = require('express');
//const studentSchema = require('../schemas/studentSchema');
router.use(express.json());
var mongo = require('mongodb').MongoClient;
var url = "mongodb+srv://CalebZhang:Zhangkeyuan333@cluster0.lb38qs6.mongodb.net/?retryWrites=true&w=majority";
const bodyParser = require('body-parser');
//search 
router.post('/searchprogramskey', bodyParser.json(), async(req,res)=>{
    var key = req.body.keywords;
        console.log(key);
        mongo.connect(url, async(err, db) => {
        var db1 = db.db("ShortCut");
        db1.collection('Program').find({name:{$regex:key,$options: 'i'}}).project({name:1,_id:0,type:1}).toArray((err,result) =>{
            if(err){
                res.send({length:0});
                return;
            }
            console.log(result.length);
            res.send({length:result.length,result});

        });
        // console.log(db1.collection('Program').find({name:{$regex:key}}, {name:1, type:1}));
        // res.json(db1.collection('Program').find({name:{$regex:key}}, {name:1, type:1}));
    });
});
module.exports = router;


