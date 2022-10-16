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
        var area = req.body.area;
        console.log(keywords);
        mongo.connect(url, async(err, db) => {
        var db1 = db.db("ShortCut");
        if(area == ""){
        db1.collection('Course').find({$or:[{name:{$regex:keywords, $options:'i'}}, {code:{$regex:keywords.toUpperCase()}}]}).toArray((err,result) =>{
            if(err) throw err;
            var rLength = result.length;
            
            if(rLength === 0){
               // console.log('wudi');
                const params={
                    check:0
                }
                res.json(params);
            }else{
                var a = new Array();
            
                for(let i=0;i<rLength;i++){
                    const params = {
                        name:result[i].name,
                        code:result[i].code
                    }
                    a[i] = params;

                }
            
            
                res.send({check:1,a});

            }
            

        });
    }else{
        if(keywords == ""){
            db1.collection('Course').find({area:area}).toArray((err,result)=>{
                if(err) throw err;
            var rLength = result.length;
            
            if(rLength === 0){
               // console.log('wudi');
                const params={
                    check:0
                }
                res.json(params);
            }else{
                var a = new Array();
            
                for(let i=0;i<rLength;i++){
                    const params = {
                        name:result[i].name,
                        code:result[i].code
                    }
                    a[i] = params;

                }
            
            
                res.send({check:1,a});

            }
            })
            
        }else{
            db1.collection('Course').find({$and:[{area:{$regex:area.toLowerCase()}},{$or:[{name:{$regex:keywords, $options:'i'}}, {code:{$regex:keywords.toUpperCase()}}]}]}).toArray((err,result)=>{
                if(err) throw err;
            var rLength = result.length;
            
            if(rLength === 0){
               // console.log('wudi');
                const params={
                    check:0
                }
                res.json(params);
            }else{
                var a = new Array();
            
                for(let i=0;i<rLength;i++){
                    const params = {
                        name:result[i].name,
                        code:result[i].code
                    }
                    a[i] = params;

                }
            
            
                res.send({check:1,a});

            }
            })

        }
    }

        });
    });





module.exports = router;