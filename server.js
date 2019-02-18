var http = require('http');
var fs   = require('fs'); 

function handleRequest(req, res){
    //res.end('Selamat Datang di NodeJS');
    res.writeHead(200, {'Content-Type': 'text/html'});

    fs.readFile('./index.html', null, function(error, data){
        if(error) {
            res.writeHead(404);
            res.write('File not Found!');
        }else{
            res.write(data);
        }

        res.end();
    });
}

var server = http.createServer(handleRequest);

server.listen(8080, function(){
    console.log('sedang berjalan pada port 8080');
});