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
router.post('/getrecommand', bodyParser.json(), async(req,res)=>{
    const completed = req.body.completed;
    var preference = req.body.preference;
    var key = req.body.stream;
    var result = {};
    result["completed"] = completed;
    result["required"]={};
    result["required"].A=[];
    result["required"].B=[];
    result["required"].C=[];
    result["required"].D=[];
    result["electives"]={};
    result["electives"].A=[];
    result["electives"].B=[];
    result["electives"].C=[];
    result["electives"].D=[];
    mongo.connect(url, async(err, db) => {
        var db1 = db.db("ShortCut");
        db1.collection('CompSci').find({stream:key}).toArray(async (err, find) => {
            if(find.length==0){
                console.log("wrong in stream name");
            }
            const allrequired = find[0].required;
            const requiredA = [];
            const requiredB = [];
            const requiredC = [];
            const requiredD = [];
            for(let i=0;i<allrequired.length;i++){
                let canadd = true;
                for(let j=0;j<completed.length;j++){
                    if(allrequired[i].localeCompare(completed[j], undefined, {sensitivity: 'base'})==0){
                        canadd = false;
                        break;
                    }
                }
                if(canadd){
                    if(/[A-Z]{3}A.*/.test(allrequired[i])){
                        requiredA.push(allrequired[i]);
                    }
                    else if(/[A-Z]{3}B.*/.test(allrequired[i])){
                        requiredB.push(allrequired[i]);
                    }
                    else if(/[A-Z]{3}C.*/.test(allrequired[i])){
                        requiredC.push(allrequired[i]);
                    }
                    else{
                        requiredD.push(allrequired[i]);
                    }
                }
            }
            // for(let i = 0 ; i< requiredA.length;i++){
            //     result["required"].A.push(requiredA[i]);
            // }
            result["required"].A = requiredA.slice();
            result["required"].B = requiredB.slice();
            result["required"].C = requiredC.slice();
            result["required"].D = requiredD.slice();
            const allelectives = find[0].electives;
            for(let z=0; z< allelectives.length;z++){
                const recommand = [];
                const notlearned = [];
                const num = allelectives[z].num/0.5;
                var count=0;//count number of completed course in each elective
                for(let i=0;i<allelectives[z].list.length;i++){
                    let learned = false;
                    for(let j=0;j<completed.length;j++){
                        if(completed[j].toLowerCase().includes(allelectives[z].list[i].toLowerCase())){
                            count=count+1;
                            learned = true;
                        }
                    }
                    if(learned==false){
                        notlearned.push(allelectives[z].list[i]);
                    }
                    
                }
                if(count>num||count==num){}
                else{
                    var remains = num-count;
                    // console.log(remains)
                    if(preference.length!=0){
                        for(let j=0;j<allelectives[z].list.length;j++){
                            if(remains==0){
                                break;
                            }
                            // console.log(j)
                            var temp = await db1.collection("Course").find({code:allelectives[z].list[j], description:{$regex:preference,$options: 'i'}}).toArray();
                            if(temp.length != 1){
                                continue;
                            }
                            let learned = false;
                            for(let j=0;j<completed.length;j++){
                                if(completed[j].toLowerCase().includes(temp[0].code.toLowerCase())){
                                    learned = true;
                                }
                                if(learned==false){
                                    recommand.push(temp[0].code);
                                    remains=remains-1;
                                    break;
                                }
                            }
                        
                        // console.log(recommand)
                        // console.log(remains)
                        }
                    }
                    if(remains>0){
                        for(let i=0;i<remains;i++){
                            while(recommand.indexOf(notlearned[i])>-1){
                                i++;
                            }
                            recommand.push(notlearned[i]);

                        }
                    }
                }
                const A = [];
                const B = [];
                const C = [];
                const D = [];
                for(let i = 0; i< recommand.length;i++){
                    if(/[A-Z]{3}A.*/.test(recommand[i])){
                        A.push(recommand[i]);
                    }
                    else if(/[A-Z]{3}B.*/.test(recommand[i])){
                        B.push(recommand[i]);
                    }
                    else if(/[A-Z]{3}C.*/.test(recommand[i])){
                        C.push(recommand[i]);
                    }
                    else{
                        D.push(recommand[i]);
                    }
                }

                for(let i = 0 ; i< A.length;i++){
                    result["electives"].A.push(A[i]);
                }
                for(let i = 0 ; i< B.length;i++){
                    result["electives"].B.push(B[i]);
                }
                for(let i = 0 ; i< C.length;i++){
                    result["electives"].C.push(C[i]);
                }
                for(let i = 0 ; i< D.length;i++){
                    result["electives"].D.push(D[i]);
                }
            }
            res.send(result);
        });
    });
});
module.exports = router;