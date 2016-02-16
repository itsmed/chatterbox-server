/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/


var requestHandler = function(request, response) {

  var statusCode = 200;
  var headers = defaultCorsHeaders;
  request.body = []; // make request body
  headers['Content-Type'] = 'application/json';
  request.headers = headers;
  response.headers = headers;

  if ( request.method === 'GET' ) {

  }
  else if (request.method === 'POST') {
      statusCode = 201;
  }
  else { // file not found
    statusCode = 404;
  }

  var responseBody = { // need to write to response body

    results: []
    // headers: response.headers,
    // method: 'GET',
    // url: url,
  }; 
  response.writeHead(statusCode);
  response.write(JSON.stringify(responseBody));
  response.end();
};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

module.exports.requestHandler = requestHandler;
