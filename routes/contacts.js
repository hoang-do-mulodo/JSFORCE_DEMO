var express = require('express');
const jsforce = require('jsforce');
const router = express.Router();
var conn = new jsforce.Connection({

    loginUrl : 'https://login.salesforce.com'
});
var username='lai.do@brave-shark-aopfgn.com';
var password='do0972268792';
password = password +'3g7lolGM2hQ1JtS44KqAEdBk';



conn.login(username, password, function(err, userInfo){});

router.get('/' , function (req , res) {
    // return res.body;
    let records = [];
    let query = conn.query("SELECT Id, Name FROM Contact")
        .on("record", function(record) {
            records.push(record);
        })
        .on("end", function() {
            console.log("total in database : " + query.totalSize);
            console.log("total fetched : " + query.totalFetched);
            res.json(records);
        })
        .on("error", function(err) {
            console.error(err);
        })
        .run({ autoFetch : true, maxFetch : 4000 });

});
router.get('/id' , function (req , res) {
    // return res.body;
    // var id =req.param('id');
    var id ='0036F00002cHQfXQAW';
    console.log('id' , id);
    // let records = [];
    // let query = conn.query("SELECT Id, Name FROM Contact WHERE Id = " + id)
    //     .on("record", function(record) {
    //         records.push(record);
    //     })
    //     .on("end", function() {
    //         console.log("total in database : " + query.totalSize);
    //         console.log("total fetched : " + query.totalFetched);
    //         res.json(records);
    //     })
    //     .on("error", function(err) {
    //         console.error(err);
    //     })
    //     .run({ autoFetch : true, maxFetch : 4000 });
    conn.sobject("Contact").retrieve(id , function (err , result) {
        if(err){
            return console.log('err', err);
        }

        console.log(result.Name);
        res.json(result);

    });

});
module.exports = router;


