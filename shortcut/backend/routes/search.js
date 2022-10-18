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
router.post('/search', bodyParser.json(), async(req,res) => {
    var keywords = req.body.keywords;
    if (keywords === "") {
        res.sendStatus(400);
        return;
    }

    console.log(keywords);
    mongo.connect(url, async(err, db) => {
        var collection = db.db("ShortCut").collection('Course');
        let resultsByName = await collection.aggregate([
            {
                "$search": {
                    "autocomplete": {
                        "query": keywords,
                        "path": "name",
                        "fuzzy": {
                            "maxEdits": 2
                        }
                    }
                }
            }
        ]).toArray();
        let resultsByCode = await collection.aggregate([
            {
                "$search": {
                    "autocomplete": {
                        "query": keywords,
                        "path": "code",
                        "fuzzy": {
                            "maxEdits": 2
                        }
                    }
                }
            }
        ]).toArray();
        // let resultsByDescription = await collection.aggregate([
        //     {
        //         "$search": {
        //             "autocomplete": {
        //                 "query": keywords,
        //                 "path": "description",
        //                 "fuzzy": {
        //                     "maxEdits": 2
        //                 }
        //             }
        //         }
        //     }
        // ]).toArray();
        let resultsByBreadth = await collection.aggregate([
            {
                "$search": {
                    "autocomplete": {
                        "query": keywords,
                        "path": "breadth",
                        "fuzzy": {
                            "maxEdits": 2
                        }
                    }
                }
            }
        ]).toArray();
        // let results = resultsByName.concat(resultsByBreadth).concat(resultsByCode).concat(resultsByDescription);
        let results = resultsByName.concat(resultsByCode).concat(resultsByBreadth);
        const unique = [...new Map(results.map((m) => [m.code, m.code])).values()];
        res.send({"list": unique});
    });
});





module.exports = router;