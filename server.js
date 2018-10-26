const jsforce = require('jsforce');

const oauth2 = new jsforce.OAuth2({
    loginUrl : 'https://brave-shark-aopfgn-dev-ed.my.salesforce.com',
    clientId: '3MVG9YDQS5WtC11pfnNCV6Zohy.klhHiOCUonZ_grG9euo2mns6CvfqwGIqTTYYGgrRkQRtmAq_yQBXACrSxb',
    clientSecret: '4657848761428212628',
    redirectUri: 'https://localhost:3000/callback'
});