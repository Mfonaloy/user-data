const http = require('http');
const URL = require('url');
const UserAc = require('./adduser');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const data = [
    { username: 'Jennifer', age: 45 },
    { username: 'Emem', age: 32 },
    { username: 'Mfonobong', age: 76}
]

const server = http.createServer(function (req, res) {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write("Welcome");
        res.end();

    } else if (req.url === '/users') {
        if (req.method === 'GET') {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(data));
            res.end();

        } else if (req.method === 'POST') {
            jsonParser(req, res, function () {
                

                const newUser = req.body;
                data.push(newUser);
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newUser));
            });
        }

    } else if (req.url.startsWith('/addNewUser')) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const newUrl = URL.parse(req.url, true);
        const params = newUrl.query;
        let u_name = params.username;
        let u_age = params.age;
        UserAc(u_name, u_age);
        res.end("Record added successfully");


    } else if (req.url === '/contact') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write("Contact page");
        res.end();
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end();
    }
});

server.listen(5000, function () {
    console.log("Server running");
});
