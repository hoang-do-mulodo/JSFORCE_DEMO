var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jsforce = require('jsforce');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const oauth2 = new jsforce.OAuth2({
    // https://login.salesforce.com/
    loginUrl : 'https://brave-shark-aopfgn-dev-ed.my.salesforce.com',
    clientId: '3MVG9YDQS5WtC11pfnNCV6Zohy.klhHiOCUonZ_grG9euo2mns6CvfqwGIqTTYYGgrRkQRtmAq_yQBXACrSxb',
    clientSecret: '4657848761428212628',
    redirectUri: 'https://localhost:3000/callback'
});

app.get("/auth/login" ,function (req, res) {
    res.redirect(oauth2.getAuthorizationUrl({scope : 'api id web'}));
});

// app.get('/callback', function(req, res) {
//     console.log('cc');
//     const conn = new jsforce.Connection({oauth2: oauth2});
//     // const code = req.query.code;
//     const code = req.param('code');
//     // const code = 'aPrxFYRxG6g7t8r6QlxckPOCNohrMRqUIG1LPwTeKvbjcjGF.HNG8zu4IKSumlZ.ePZFZKutRw==';
//     conn.authorize(code, function (err, userInfo) {
//         if (err) {
//             return console.error("This error is in the auth callback: " + err);
//         }
//         console.log('Access Token: ' + conn.accessToken);
//         console.log('Instance URL: ' + conn.instanceUrl);
//         console.log('refreshToken: ' + conn.refreshToken);
//         console.log('User ID: ' + userInfo.id);
//         console.log('Org ID: ' + userInfo.organizationId);
//         req.session.accessToken = conn.accessToken;
//         req.session.instanceUrl = conn.instanceUrl;
//         req.session.refreshToken = conn.refreshToken;
//
//
//         console.log('access' , req);
//
//         var string = encodeURIComponent('true');
//         res.redirect('http://localhost:3000/?valid=' + string);
//      // });
//     });
// });
//
// // var records = [];
// // conn.query("SELECT Id, Name FROM Account", function(err, result) {
// //     if (err) { return console.error(err); }
// //     console.log("total : " + result.totalSize);
// //     console.log("fetched : " + result.records.length);
// // });
// app.get('/api/accounts', function(req, res) {
//     // req.session.accessToken = 'aPrxFYRxG6g7t8r6QlxckPOCNhVKr0J7cNY8jW2LSzETn8XcmSpfRAtkZpozo1cGvWl2r5WmkQ%3D%3D';
// // if auth has not been set, redirect to index
//     if (!req.session.accessToken || !req.session.instanceUrl) { res.redirect('/'); }
// //SOQL query
//     let q = 'SELECT id, name FROM account LIMIT 10';
// //instantiate connection
//     let conn = new jsforce.Connection({
//         oauth2 : {oauth2},
//         accessToken: req.session.accessToken,
//         instanceUrl: req.session.instanceUrl
//     });
// //set records array
//     let records = [];
//     let query = conn.query(q)
//         .on("record", function(record) {
//             records.push(record);
//         })
//         .on("end", function() {
//             console.log("total in database : " + query.totalSize);
//             console.log("total fetched : " + query.totalFetched);
//             res.json(records);
//         })
//         .on("error", function(err) {
//             console.error(err);
//         })
//         .run({ autoFetch : true, maxFetch : 4000 });
// });

var conn = new jsforce.Connection({
    // you can change loginUrl to connect to sandbox or prerelease env.
    loginUrl : 'https://login.salesforce.com'
});
var username='lai.do@brave-shark-aopfgn.com';
var password='do0972268792';
conn.login(username, password, function(err, userInfo) {
    if (err) { return console.error(err); }
    // Now you can get the access token and instance URL information.
    // Save them to establish connection next time.
    console.log(conn.accessToken);
    console.log(conn.instanceUrl);
    // logged in user property
    console.log("User ID: " + userInfo.id);
    console.log("Org ID: " + userInfo.organizationId);
    var records = [];
    conn.query("SELECT Id, Name FROM Account", function(err, result) {
        if (err) { return console.error("z"+err); }
        console.log("total : " + result.totalSize);
        totalSize=result.totalSize;
        console.log("fetched : " + result.records.length);
    });
});

module.exports = app;
