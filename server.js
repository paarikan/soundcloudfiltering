var http = require('http');
var dispatcher = require('httpdispatcher');
var fs = require('fs');

//We need a function which handles requests and send response
function handleRequest(request, response){
    try {
        console.log(request.url);
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

fs.readFile('index.html',function (err, data){
	dispatcher.onGet("/soundcloudlikes/index.html", function(req, res) {
	    res.writeHead(200, {'Content-Type': 'text/html'});
	    res.end(data);
	});   
});

fs.readFile('callback.html',function (err, data){
	dispatcher.onGet("/soundcloudlikes/callback.html", function(req, res) {
	    res.writeHead(200, {'Content-Type': 'text/html'});
	    res.end(data);
	});   
});

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(8080, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", 8080);
});