var express = require('express');
var http = require('http');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
require('./models/user');

var userManager = require('./routes/userManager');
var movieManager = require('./routes/movieManager');

var port = 3000;

var app = express();
app.use(cors());

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'client')));

app.use('/api', userManager);
app.use('/movie', movieManager);

app.get('*', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'client')});
  });

app.set('port', process.env.PORT);

const server = http.createServer(app);

server.listen(process.env.PORT, function() {
    console.log("Server started on port " + process.env.PORT);
});