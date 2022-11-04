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
    const area = req.body.area;
    const degree = req.body.degree;
    const enrolment = req.body.enrolment;
    const coop = req.body.coop;
    const type = req.body.type;
    const name = req.body.keywords;
    const finalresult = [];
    // console.log(key);
    mongo.connect(url, async(err, db) => {
        var db1 = db.db("ShortCut");
        if(enrolment=="unlimited"&&coop=="nocoop"){
            db1.collection('Program').find({name:{$regex:name,$options: 'i'},area:{$regex:area,$options: 'i'},degree:{$regex:degree,$options: 'i'},
            enrolment:"",coop:"",type:{$regex:type,$options: 'i'}}).toArray((err,result) =>{
                if(err){
                    res.send({length:0});
                    return;
                }
                if(degree=="BA"){
                    for(let z =0;z<result.length;z++){
                        const finddegree = result[z].degree;
                        console.log(finddegree,finddegree.match(/BBA/i));
                        if(finddegree.match(/BBA/i)==null){
                            finalresult.push(result[z]);
                        }
                    }
                }
                else{
                    for(let z =0;z<result.length;z++){
                        finalresult.push(result[z]);
                    }
                }
                // console.log(result[0].degree);
                // console.log(result);
                res.send({length:finalresult.length,finalresult});

            });
        } 
        else if((enrolment=="unlimited"&&coop!="nocoop")){
            db1.collection('Program').find({name:{$regex:name,$options: 'i'},area:{$regex:area,$options: 'i'},degree:{$regex:degree,$options: 'i'},
            enrolment:"",coop:{$regex:coop,$options: 'i'},type:{$regex:type,$options: 'i'}}).toArray((err,result) =>{
                if(err){
                    res.send({length:0});
                    return;
                }
                if(degree=="BA"){
                    for(let z =0;z<result.length;z++){
                        const finddegree = result[z].degree;
                        console.log(finddegree,finddegree.match(/BBA/i));
                        if(finddegree.match(/BBA/i)==null){
                            finalresult.push(result[z]);
                        }
                    }
                }
                else{
                    for(let z =0;z<result.length;z++){
                        finalresult.push(result[z]);
                    }
                }
                res.send({length:finalresult.length,finalresult});

                // // console.log(result[0].degree);
                // // console.log(result);
                // res.send({length:result.length,result});

            });
        }
        else if((enrolment!="unlimited"&&coop!="nocoop")){
            db1.collection('Program').find({name:{$regex:name,$options: 'i'},area:{$regex:area,$options: 'i'},degree:{$regex:degree,$options: 'i'},
            enrolment:{$regex:enrolment,$options: 'i'},coop:{$regex:coop,$options: 'i'},type:{$regex:type,$options: 'i'}}).toArray((err,result) =>{
                if(err){
                    res.send({length:0});
                    return;
                }
                // // console.log(result[0].degree);
                // // console.log(result);
                // res.send({length:result.length,result});
                if(degree=="BA"){
                    for(let z =0;z<result.length;z++){
                        const finddegree = result[z].degree;
                        console.log(finddegree,finddegree.match(/BBA/i));
                        if(finddegree.match(/BBA/i)==null){
                            finalresult.push(result[z]);
                        }
                    }
                }
                else{
                    for(let z =0;z<result.length;z++){
                        finalresult.push(result[z]);
                    }
                }
                res.send({length:finalresult.length,finalresult});

            });
        }
        else{
            db1.collection('Program').find({name:{$regex:name,$options: 'i'},area:{$regex:area,$options: 'i'},degree:{$regex:degree,$options: 'i'},
            enrolment:{$regex:enrolment,$options: 'i'},coop:"",type:{$regex:type,$options: 'i'}}).toArray((err,result) =>{
                if(err){
                    res.send({length:0});
                    return;
                }
                // // console.log(result[0].degree);
                // // console.log(result)
                // res.send({length:result.length,result});
                if(degree=="BA"){
                    for(let z =0;z<result.length;z++){
                        const finddegree = result[z].degree;
                        console.log(finddegree,finddegree.match(/BBA/i));
                        if(finddegree.match(/BBA/i)==null){
                            finalresult.push(result[z]);
                        }
                    }
                }
                else{
                    for(let z =0;z<result.length;z++){
                        finalresult.push(result[z]);
                    }
                }
                res.send({length:finalresult.length,finalresult});

            });
        }

    });
});
module.exports = router;
