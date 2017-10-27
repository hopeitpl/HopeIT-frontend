#!/usr/bin/env node

var path = require('path'),
    express = require('express'),
    compression = require('compression');

// Init express server
var app = express();

app.use(compression());
app.use('/static', express.static(path.join(__dirname, '../dist/static')));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'), function (err) {
        res.status(500).send(err);
    });
});

const PORT = parseInt(process.env.PORT || '3333');
const IP = process.env.IP || '0.0.0.0';

app.listen(PORT, IP, function() {
    console.log('Server listening on ' + IP + ':' + PORT); // eslint-disable-line
});
