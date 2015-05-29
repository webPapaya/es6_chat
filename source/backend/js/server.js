import Express from 'express';

let server = Express();

server.get('/', req, res => {
    res.send('Hello World!');
});