const http = require('http');
const fs = require('fs');
const port = 8080;

var admin = require('firebase-admin');

const server = http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type' : 'text/html'})
    fs.readFile('Home.html', function(error,data){
        if(error)
        {
            res.writeHead(404);
            res.write("ERROR: FILE NOT FOUND");
        }

        else
        {
            res.write(data);
        }
        
        res.end();
    })
})

//Set server to listen
server.listen(port, function(error)
{
    if(error)
    {
        console.log("ERROR: ", error);
    }

    else{
        console.log('Server is listening on port: '+ port);
    }
})

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://quarentine-games.firebaseio.com'
})