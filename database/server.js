const http = require('http');


const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('hello i am the server!');

});


server.listen(process.env.PORT || 9005);