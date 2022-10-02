const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://RunyuYue:yuerunyu1@cluster0.lb38qs6.mongodb.net/?retryWrites=true&w=majority";
var myobj;
//import controllers
const {getTest} = require('../controllers/test');

//import middlewares


// api routes
router.get('/test', getTest);
module.exports = router;
//signup will resturn result:0 on success 1 on duplicate email or error in connection
router.post("/signup",async(req,res,next)=>{
    req.body.password=await bcrypt.hash(req.body.password,10);
    console.log(req.body.password+"\n");
    var student={
      email: {
        data: req.body.email,
        display: true
      },
      password: req.body.password,
      name:{
        data:"",
        display: true
      },
      dateofbirth:{
        data:null,
        display:true
      },
      gender:{
        data:"",
        display: true
      },
      Program:{
        data:"",
        display: true
      },
      Description:{
        data:"",
        display: true
      }
    }
    MongoClient.connect(url, async(err, db)=> {
      if (err) {
        res.send({result:"0"});
      }
      var dbo = db.db("ShortCut");
      myobj=await dbo.collection("Student").findOne({"email.data":req.body.email});
      if(myobj != null){
        res.send({result:"0"}); 
        return;
      }
      dbo.collection("Student").insertOne(student, function(err, res) {
        if (err){
          res.send({result:"0"}); 
          return;
        }
        db.close();  
      });
      res.send({result:"1"});
    });
  })