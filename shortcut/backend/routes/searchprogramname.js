const express = require('express');
const router = express.Router();
const e = require('express');
//const studentSchema = require('../schemas/studentSchema');
router.use(express.json());
var mongo = require('mongodb').MongoClient;
var url = "mongodb+srv://CalebZhang:Zhangkeyuan333@cluster0.lb38qs6.mongodb.net/?retryWrites=true&w=majority";
const bodyParser = require('body-parser');
//search 
router.post('/searchprogramname', bodyParser.json(), async(req,res)=>{
    var key = req.body.name;
        console.log(key);
        mongo.connect(url, async(err, db) => {
        var db1 = db.db("ShortCut");
        db1.collection('Program').find({name:key}).toArray((err,item) =>{
            if(err){
                throw err;
            }
            console.log(item.length);
            res.send({result:item.length,item});

        });
        // console.log(db1.collection('Program').find({name:{$regex:key}}, {name:1, type:1}));
        // res.json(db1.collection('Program').find({name:{$regex:key}}, {name:1, type:1}));
    });
});
module.exports = router;

