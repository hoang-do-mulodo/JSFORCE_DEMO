var express = require('express');
const jsforce = require('jsforce');
const router = express.Router();
var conn = new jsforce.Connection({
    // you can change loginUrl to connect to sandbox or prerelease env.
    loginUrl : 'https://login.salesforce.com'
});
var username='lai.do@brave-shark-aopfgn.com';
var password='do0972268792';
password = password +'3g7lolGM2hQ1JtS44KqAEdBk';



conn.login(username, password, function(err, userInfo){});

router.get('/' , function (req , res) {
    // conn.query("SELECT Id, Name FROM Account", function(err, result){
    //     console.log('account' , result.records);
    //     res.body = result.records;
    //     // return result.records;
    // });
    // return res.body;
    let records = [];
    let query = conn.query("SELECT Id, Name FROM Account")
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
module.exports = router;


