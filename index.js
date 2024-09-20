import http  from 'http';


const Server = http.createServer(async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});
Server.listen(3000, () => {
    console.log('Server running on port 3000');
});

