const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const e = require('express');
const { default: mongoose } = require('mongoose');
//const studentSchema = require('../schemas/studentSchema');
router.use(express.json());
var mongo = require('mongodb').MongoClient;
var url = "mongodb+srv://CalebZhang:Zhangkeyuan333@cluster0.lb38qs6.mongodb.net/?retryWrites=true&w=majority";



router.post('/like', bodyParser.json(), async (req, res) => {

    var user_email = req.body.email;
    var comment_id = mongoose.Types.ObjectId(req.body._id);

    var new_likes;
    var new_dislikes;
    
    mongo.connect(url, async(err, db) => {
        if (err){
          res.json({ 'result': 0, 'message': 'Error.' });
          res.end();
          return;
        }
        var db1 = db.db("ShortCut");
        db1.collection('Comment').find({"_id":{ $eq: comment_id }}).toArray(async (err,comments) =>{
            if (err){
                res.json({ 'result': 0, 'message': 'Error.' });
                res.end();
                return;
            }
            for(const comment of comments){

                likers = [];
                likers = comment.likedEmails;
        
                dislikers = [];
                dislikers = comment.dislikedEmails;
        
                if (likers.includes(user_email)){
                    new_likes = comment.numLikes - 1;
                    new_dislikes = comment.numDislikes
                    await db1.collection('Comment').updateOne(
                        { "_id": comment_id },
                        {
                            $pull: { "likedEmails": user_email },
                            $set: { "numLikes": new_likes }
                        }
                    );

                    res.json({ 'result': 2, 'likes': new_likes, 'dislikes': new_dislikes });
                }
                else if (dislikers.includes(user_email)){
                    new_likes = comment.numLikes + 1;
                    new_dislikes = comment.numDislikes - 1;
                    await db1.collection('Comment').updateOne(
                        { "_id": comment_id },
                        {
                            $push: { "likedEmails": user_email },
                            $set: { "numLikes": new_likes, "numDislikes": new_dislikes },
                            $pull: { "dislikedEmails": user_email }
                        }
                    );

                    res.json({ 'result': 3, 'likes': new_likes, 'dislikes': new_dislikes });
                }
                else{
                    new_likes = comment.numLikes + 1;
                    new_dislikes = comment.numDislikes
                    await db1.collection('Comment').updateOne(
                        { "_id": comment_id },
                        {
                            $push: { "likedEmails": user_email },
                            $set: { "numLikes": new_likes }
                        }
                    );

                    res.json({ 'result': 1, 'likes': new_likes, 'dislikes': new_dislikes });
                }
                res.end();
                db.close();
                return;
            }
            res.json({ 'result': 0, 'message': 'Error.' });
            res.end();
            
            db.close();

        });
        
    });

});
module.exports = router;