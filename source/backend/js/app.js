import express from 'express';
import Room from './room';

var app     = express();


app.get('/', function (req, res) {
    res.send('Hello!');
});

app.get('/rooms', function (req, res) {
   res.send(Room.all());
});

var server = app.listen(81818, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});


