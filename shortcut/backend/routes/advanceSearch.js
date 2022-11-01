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
router.post('/advanceSearch', bodyParser.json(), async(req,res)=>{
    // var a = [{key:"ww"}];
    // var b = [{key:"ww"}];
    // var union = [...new Set([...a, ...b])];
    // console.log(union);
        var keywords = req.body.res.keywords;
        var pre = req.body.res.pre;     
        var description = req.body.res.description;    
        var score = req.body.res.score.average;
        var breadth = req.body.res.breadth;
        var level = req.body.res.level;
        
        console.log(score);
        //{"score.average":{$regex:score, $options:'i'}}
        mongo.connect(url, async(err, db) => {
        var db1 = db.db("ShortCut");
    
        db1.collection('Course').find({$and:[{breadth:{$regex:breadth, $options:'i'}},{$or:[{name:{$regex:keywords, $options:'i'}}, {code:{$regex:keywords, $options:'i'}}]},{description:{$regex:description, $options:'i'}}]}).toArray((err,result) =>{
            if(err) throw err;
            var rLength = result.length;
            console.log(result);
             console.log(rLength);
            
            if(rLength === 0){
               // console.log('wudi');
                const params={
                    check:0
                }
                res.json(params);
            }else{
                var a = new Array();
              
            if(pre == "no"){    
               if(level == ""){
                         var b = 0;
                         //console.log("heheheh")
                        for(let i=0;i<rLength;i++){
                            console.log(result[i].prerequisites.length)
                            if(result[i].score.average >= score && result[i].prerequisites.length == 0){
                                const params = {
                                    name:result[i].name,
                                    code:result[i].code
                                }
                                a[b] = params;
                                b = b+1;
                            }
                        if(a.length == 0){
                            res.send({check:0});
                        }


                        }

                        
                        res.send({check:1,a});
                }else{
                    var b = 0;
                    for(let i=0;i<rLength;i++){
                  
                        if(result[i].score.average >= score && result[i].code[3] == level && result[i].prerequisites.length == 0){
                            const params = {
                                name:result[i].name,
                                code:result[i].code
                            }
                            a[b] = params;
                            b=b+1;
                        }
                        if(a.length == 0){
                            res.send({check:0});
                        }

                    
                    }

                
                    res.send({check:1,a});

                }

            }else if(pre == "need"){
                if(level == ""){
                    var b = 0;
                    for(let i=0;i<rLength;i++){
                        if(result[i].score.average >= score && result[i].prerequisites.length != 0){
                            const params = {
                                name:result[i].name,
                                code:result[i].code
                            }
                            a[b] = params;
                            b = b+1;
                        }
                        if(a.length == 0){
                            res.send({check:0});
                        }

                    


                    }

                
                    res.send({check:1,a});
                    


            }else{
                var b = 0;
                for(let i=0;i<rLength;i++){
              
                    if(result[i].score.average >= score && result[i].code[3] == level && result[i].prerequisites.length != 0){
                        const params = {
                            name:result[i].name,
                            code:result[i].code
                        }
                        a[b] = params;
                        b=b+1;
                    }
                    if(a.length == 0){
                        res.send({check:0});
                    }

                
                }

            
                res.send({check:1,a});

            }

            }else{
                console.log("hello");
                if(level == ""){
                    console.log(rLength);
                    var b = 0;
                    for(let i=0;i<rLength;i++){
                        console.log(score);
                        if(result[i].score.average >= score){
                            const params = {
                                name:result[i].name,
                                code:result[i].code
                            }
                            a[b] = params;
                            b = b+1;
                        }
                        if(a.length == 0){
                            res.send({check:0});
                        }

                    


                    }

                
                    res.send({check:1,a});
            }else{
                var b = 0;
                for(let i=0;i<rLength;i++){
              
                    if(result[i].score.average >= score && result[i].code[3] == level){
                        const params = {
                            name:result[i].name,
                            code:result[i].code
                        }
                        a[b] = params;
                        b=b+1;
                    }
                    if(a.length == 0){
                        res.send({check:0});
                    }

                
                }

            
                res.send({check:1,a});

            }

                
            }
            }
            
            

        });
    
    

        });
    });





module.exports = router;