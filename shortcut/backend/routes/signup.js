const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Student = require('../schemas/StudentSchema');
var MongoClient = require('mongodb').MongoClient;
const mongoose = require("mongoose");
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
    MongoClient.connect(url, async(err, db)=> {
      if (err) {
        res.send({result:"0"});
      }
      var dbo = db.db("ShortCut");
      myobj=await dbo.collection("Student").findOne({"email.data":req.body.email});
      if(myobj != null){
        console.log(myobj);
        res.send({result:"0"}); 
        return;
      }
      try {
        const student = new Student({email:{data: req.body.email, display: true},password: req.body.password});
        await student.save();
      }
      catch(e){
        res.send({result:"0"}); 
        console.log(e.message);
        return;
      }    
      console.log("Done");
      res.send({result: "1"});
      return;

    });
    // var student={
    //   email: {
    //     data: req.body.email,
    //     display: true
    //   },
    //   password: req.body.password,
    //   name:{
    //     data:"",
    //     display: true
    //   },
    //   dateofbirth:{
    //     data:null,
    //     display:true
    //   },
    //   gender:{
    //     data:"",
    //     display: true
    //   },
    //   Program:{
    //     data:"",
    //     display: true
    //   },
    //   Description:{
    //     data:"",
    //     display: true
    //   }
    // }
      // dbo.collection("Student").insertOne(stu, function(err, res) {
      //   if (err){
      //     res.send({result:"0"}); 
      //     return;
      //   }
      //   db.close();  
      // });
      // res.send({result:"1"});
});
