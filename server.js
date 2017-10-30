var express = require('express')
var http = require('http');
var https = require('https');
var bodyParser = require('body-parser');
var app = express()
var port = process.env.PORT || 3000;


app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

// respond with "hello world" when a GET request is made to the homepage
app.get('/weather', function(req, res) {
	console.log(req.body.lat, req.body.lng)
  https.request('https://api.darksky.net/forecast/3a21faa3313d1c8a5f492012e33ebf78/37.8267,-122.4233', function(response) {
    response.pipe(res);
  }).on('error', function(e) {
    res.sendStatus(500);
  }).end();
});

app.post('/weather', function(req, res) {
	console.log(req.body.lat, req.body.lng)
	let lat=req.body.lat;
	let lng = req.body.lng;
  https.request('https://api.darksky.net/forecast/3a21faa3313d1c8a5f492012e33ebf78/'+ lat +','+ lng, function(response) {
    response.pipe(res);
  }).on('error', function(e) {
    res.sendStatus(500);
  }).end();
});


app.post('/history', function(req, res) {
  let lat=req.body.lat;
  let lng = req.body.lng;
  let hist = req.body.hist
  let url = 'https://api.darksky.net/forecast/3a21faa3313d1c8a5f492012e33ebf78/'+ lat +','+ lng +',' + hist +'?exclude=currently,flags';
  console.log(url);
  https.request('https://api.darksky.net/forecast/3a21faa3313d1c8a5f492012e33ebf78/'+ lat +','+ lng +',' + hist +'?exclude=currently,flags', function(response) {
    response.pipe(res);
  }).on('error', function(e) {
    res.sendStatus(500);
  }).end();
});


app.listen(port, function () {
  console.log('Example app listening on port' + port)
})