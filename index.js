// Dependency
var http = require('http');
var url = require('url');

var enviroment = require('./config');

var server = http.createServer( ( req, res ) => {
    
    // Get the url from req and parse it.
    var parsedUrl = url.parse(req.url, true);

    // Get the path and trimmed path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');
    
    // Get http method
    var method = req.method.toLocaleLowerCase();

    // Get headers object
    var headers = req.headers;

    //Choose handler and route the request
    var choosenhandler = typeof(routes[trimmedPath]) !== 'undefined' ? routes[trimmedPath] : handlers.notFoundHandler;
    var data = {
        'path' :  trimmedPath,
        'method' : method,
        'headers' : headers
    };

    // Route the request to choosen handler
    choosenhandler(data, function( statuscode, payload ){
        //get the status code from callback 
        statuscode = typeof(statuscode) == 'number' ? statuscode : 200;
        //get the payload from callback 
        payload = typeof(payload) == 'object' ? payload : {};

        // convert the payload object to String
        var payloadString = JSON.stringify(payload);
        
        // Return the response
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(statuscode);
        res.end(payloadString);

    });

});

// Start the server and listen to port based on config.
server.listen(enviroment.port, () => {
    console.log(`Server has started and listening on port ${enviroment.port} `);
});

var handlers = {};
handlers.notFoundHandler = function(data, callback){
    callback(404);
};
handlers.helloHandler = function(data, callback){
    var response = {
        "msg" : "welcome to nodejs"
    };
    callback(200, response);
};
var routes = {
    'hello' : handlers.helloHandler
}