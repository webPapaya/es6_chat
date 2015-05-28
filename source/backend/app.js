import express from 'express';
var app     = express();

app.get('/', function (req, res) {
    res.send('Hello!');

});

var server = app.listen(81818, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});


