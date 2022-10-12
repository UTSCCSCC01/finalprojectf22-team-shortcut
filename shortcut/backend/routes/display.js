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

//Display
router.post('/display', bodyParser.json(), async(req,res)=>{
        var code = req.body.code;
    
        mongo.connect(url, async(err, db) => {
        var db1 = db.db("ShortCut");
        var course  = await db1.collection('Course').findOne({code: code});
        //console.log(student.password);
        if(course == null){
            const params = {
                check:0
            }
            res.json(params);
        }else{
            res.json(course);           
         
        }
       

        });



   
    });





module.exports = router;