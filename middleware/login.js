const express = require('express');
const Promise = require('bluebird');
const fs = require('fs-promise');
const pgp = require('pg-promise')({
  promiseLib: Promise
});
const bodyParser = require('body-parser');




const hbs = require('hbs');


const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.set('view engine', 'hbs');

app.use(function myMiddleware(request, response, next) {
  // prints the request method and path
  console.log(request.method, request.path);
  next();
});

app.use(function(request, response, next) {
  var contents = request.method + ' ' + request.path;
  fs.appendFile('logfile.txt', contents)
    .then(function() {
      next();
    })
    .catch(next);
});

app.get('/', function I_am_middleware(req, res) {
  res.send('Hello World!');
});









app.listen(3000, function() {
  console.log('Listening on port 3000');
});
