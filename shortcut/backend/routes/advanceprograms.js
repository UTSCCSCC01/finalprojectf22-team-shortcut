const express = require('express');
const router = express.Router();
const e = require('express');
//const studentSchema = require('../schemas/studentSchema');
router.use(express.json());
var mongo = require('mongodb').MongoClient;
var url = "mongodb+srv://CalebZhang:Zhangkeyuan333@cluster0.lb38qs6.mongodb.net/?retryWrites=true&w=majority";
const bodyParser = require('body-parser');
//search 
//if erolment = "\\w" search limited
//if erolment = "" search everything
//if erolment = "unlimited" match the empty string
//if coop ="nocoop" match no coop
router.post('/advanceprograms', bodyParser.json(), async(req,res)=>{
    var area = req.body.area;
    var degree = req.body.degree;
    var enrolment = req.body.enrolment;
    var coop = req.body.coop;
    var type = req.body.type;
    // console.log(key);
    mongo.connect(url, async(err, db) => {
        var db1 = db.db("ShortCut");
        if(enrolment=="unlimited"&&coop=="nocoop"){
            db1.collection('Program').find({area:{$regex:area,$options: 'i'},degree:{$regex:degree,$options: 'i'},
            enrolment:"",coop:"",type:{$regex:type,$options: 'i'}}).toArray((err,result) =>{
                if(err){
                    res.send({length:0});
                    return;
                }
                console.log(result.length);
                res.send({length:result.length,result});

            });
        }
        else if((enrolment=="unlimited"&&coop!="nocoop")){
            db1.collection('Program').find({area:{$regex:area,$options: 'i'},degree:{$regex:degree,$options: 'i'},
            enrolment:"",coop:{$regex:coop,$options: 'i'},type:{$regex:type,$options: 'i'}}).toArray((err,result) =>{
                if(err){
                    res.send({length:0});
                    return;
                }
                console.log(result.length);
                res.send({length:result.length,result});

            });
        }
        else if((enrolment!="unlimited"&&coop!="nocoop")){
            db1.collection('Program').find({area:{$regex:area,$options: 'i'},degree:{$regex:degree,$options: 'i'},
            enrolment:{$regex:enrolment,$options: 'i'},coop:{$regex:coop,$options: 'i'},type:{$regex:type,$options: 'i'}}).toArray((err,result) =>{
                if(err){
                    res.send({length:0});
                    return;
                }
                console.log(result.length);
                res.send({length:result.length,result});

            });
        }
        else{
            db1.collection('Program').find({area:{$regex:area,$options: 'i'},degree:{$regex:degree,$options: 'i'},
            enrolment:{$regex:enrolment,$options: 'i'},coop:"",type:{$regex:type,$options: 'i'}}).toArray((err,result) =>{
                if(err){
                    res.send({length:0});
                    return;
                }
                console.log(result.length);
                res.send({length:result.length,result});

            });
        }

    });
});
module.exports = router;
