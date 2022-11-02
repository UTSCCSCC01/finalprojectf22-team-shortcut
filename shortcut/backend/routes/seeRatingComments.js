const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const e = require('express');
const { default: mongoose } = require('mongoose');
//const studentSchema = require('../schemas/studentSchema');
router.use(express.json());
var mongo = require('mongodb').MongoClient;
var url = "mongodb+srv://CalebZhang:Zhangkeyuan333@cluster0.lb38qs6.mongodb.net/?retryWrites=true&w=majority";



router.post('/seeRatingComments', bodyParser.json(), async (req, res) => {
    var key = req.body._id;
    mongo.connect(url, async(err, db) => {
        if (err){
          res.json({ 'result': 0, 'message': 'Error.' });
          res.end();
          return;
        }
        var db1 = db.db("ShortCut");
        db1.collection('Comment').find({"parent":{ $eq: key }}).toArray((err,child_comments) =>{
            if (err){
                res.json({ 'result': 0, 'message': 'Error.' });
                res.end();
                return;
            }
            res.json({ 'result': 1, 'child comments': child_comments, 'message': 'returning child comments.' });
            res.end(); 

            db.close();
            
        });
        
    });

});
module.exports = router;