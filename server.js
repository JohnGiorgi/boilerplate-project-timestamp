// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// all challange code goes here
app.get("/api/timestamp/:date_string", (req, res) => {
  const date_string = req.params.date_string;
  // try converting to int to catch unix timestamps
  let d = new Date(date_string);
  if (!isValidDate(d)) {
    d = new Date(parseInt(date_string));
  }

  res.json({"unix": d.getTime(), "utc" : d.toUTCString()});
});

// help functions
function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
