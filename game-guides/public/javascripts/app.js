const http = require('http');
const fs = require('fs');
const port = 8080;

const server = http.createServer(function(req,res){
    res.writeHead(200, {'Content-Type': 'text/html'})
    fs.readFile('home.html', function(error,data){
        if(error)
        {
            res.writeHead(404);
            res.write('File not found');
        }
        else{
            res.write(data)
        }
        res.end()
    });

})

server.listen(port, function(error){
    if(error)
    {
        console.log('Error: ' +error);
    }

    else{
        console.log("Server listening on: " +port);
    }
})

var admin = require('firebase-admin');


admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://quarentine-games.firebaseio.com'
})