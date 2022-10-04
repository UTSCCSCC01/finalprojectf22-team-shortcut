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

async function comparePassword(plainPw,hash){
    const result = await bcrypt.compare(plainPw,hash);
    return result;
}
async function hashPassword(plainPw){
    const hash = await bcrypt.hash(plainPw,10);
    return hash;
}

//Login
router.post('/login', bodyParser.json(), async(req,res)=>{
    var email = req.body.email;
    var password = req.body.password;
    // console.log(req.body.password);
    // console.log(password);
    
        mongo.connect(url, async(err, db) => {
        var db1 = db.db("ShortCut");
        var student  = await db1.collection('Student').findOne({"email.data": req.body.email});
        console.log(student.password);
        if(student == null){
            const params = {
                check:0
            }
            res.json(params);
        }else{
            const params1 = {
                check:0
            }
            if(await bcrypt.compare(req.body.password,student.password)){
                console.log(1);
           
                const check1 = {
                    check:1
                };
                
                // const obj1 = JSON.parse(check1);
                // const obj2 = JSON.parse(student);
                
                const params = {
                    ...check1,
                    ...student,
                }
                res.json(params);
        
            }else{
                res.json(params1);
            }
            

           
         
        }
       

        });



   
    });





module.exports = router;