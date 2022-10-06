const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Student = require('../schemas/StudentSchema');
var mongo = require('mongodb').MongoClient;
var url = "mongodb+srv://CalebZhang:Zhangkeyuan333@cluster0.lb38qs6.mongodb.net/?retryWrites=true&w=majority";


router.post('/delete', bodyParser.json(), async(req,res)=>{
    // var id = req.body._id.$oid;
    // // var id = '"$oid":"6336546fe4297bcdbfe06641"';
    // Student.findById(id, function(err, doc) {
    //     if (err || !doc) {
    //       res.send('fail');
    //       return;
    //     }
    //     Student.findByIdAndRemove(id).exec();
    //     res.send('success');
    // })

    
    mongo.connect(url, async(err, db) => {
      if (err){
        res.json({ 'data': req.body, 'result': 0, 'message': 'Error when deleting.' });
        res.end();
        return;
      }
      var id = req.body._id.$oid;
      var db1 = db.db("ShortCut");
      myobj  = await db1.collection('Student').findOne({"email.data": req.body.email.data});
      if(myobj == null){
          res.json({ 'data': req.body, 'result': 0, 'message': 'Error when deleting.' });
          res.end();
          return;
      }
      await db1.collection('Student').deleteOne({"email.data": req.body.email.data});
      res.json({ 'data': req.body, 'result': 1, 'message': 'User deleted.' });
      res.end();

      db.close();

    });

});

module.exports = router;