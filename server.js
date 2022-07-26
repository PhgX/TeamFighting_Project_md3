const fs = require("fs");
const http = require("http");
const url = require("url");
const qs = require("qs");

const mimeTypes = {
    "html": "text/html",
    "js": "text/javascript",
    "min.js": "text/javascript",
    "css": "text/css",
    "min.css": "text/css",
    "jpg": "image/jpg",
    "png": "image/png",
    "gif": "image/gif",
    "woff": "text/html",
    "ttf": "text/html",
    "woff2": "text/html",
    "eot": "text/html",
};
const server = http.createServer((req,res) => {
    const filesDefences = req.url.match(/\.js|.css|.jpg|.png|.gif|min.js|min.css|.woff|.ttf|.woff2|.eot/);
    if (filesDefences) {
        let filePath = filesDefences[0].toString();
        let extension = mimeTypes[filesDefences[0].toString().split('.')[1]];
        if (filePath.includes('/css')){
            extension = mimeTypes[filesDefences[0].toString().split('/')[1]];
        }
        if (extension.includes('?')){
            extension = extension.split('?')[0];
        }
        res.writeHead(200, { 'Content-Type': extension });
        fs.createReadStream(__dirname + "/" + req.url).pipe(res)
    }else{
        let urlParse = url.parse(req.url);
        let pathName = urlParse.pathname;
        switch (pathName) {
            case '/': {
                fs.readFile('views/home/index.html','utf-8',(err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.write(data);
                    return res.end();
                }
                })
                break;
            }
            case '/login': {
                    fs.readFile('views/login/login.html','utf-8',(err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.writeHead(200, { "Content-Type": "text/html" });
                        res.write(data);
                        return res.end();
                    }
                    })
                    break;
            }
            case '/signup': {
                fs.readFile('views/login/signup.html','utf-8',(err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.write(data);
                    return res.end();
                }
                })
                break;
        }
        }
    }
    
});

server.listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
  });