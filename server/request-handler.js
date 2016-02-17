/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/


var requestHandler = function(request, response) {

  var headers = defaultCorsHeaders;
  var messageStorage = []; // message storage
  headers['Content-Type'] = 'application/json';
  request.headers = headers;
  response.headers = headers;
  var responseBody = {}; 

  if ( request.method === 'GET' ) {
    if (request.url === '/classes/messages') {
      
      //user is asking for all the messages to be returned

      console.log('handling GET request to /classes/messages');

      //send back messageStorage
      responseBody.results = messageStorage;

      response.statusCode = 200;
            
      // request.on('data', function(chunk) {
      //   response.write(chunk);
      // });

    } else if(request.url === '/log'){
      console.log('handling GET request to /log');
      response.statusCode = 200;
    } else {
      console.log('handling GET request to other URL');
      response.statusCode = 404;
    }
  }
  else if (request.method === 'POST') {
      var temp;
      response.statusCode = 201;
      var allData = '';
      
      console.log('POST request received, URL is', request.url);

      if(request.url === '/classes/messages'){

        //user wants to store a message
        
        console.log('handling POST request to /classes/messages');

        //POST comes with data, so get it
        request.on('data', function(chunk) {
          allData += chunk.toString();
          console.log('----------------------------------------chunk: ');
        });


        request.on('end', function() {
          
          console.log('data ended!!!', allData);

          //turn allData back into an object and store it!
          messageStorage.push(JSON.parse(allData));


          //body = Buffer.concat(body).toString();

          //do something with the data (store it)

        });

      }else if(request.url === '/send'){
        console.log('handling POST request to /send');
        
      }


      // console.log('*****************************body: ', body);
  }
  else { // file not found
    response.statusCode = 404;
  }

  //responseBody['results'].push(body);
  console.log('----------------------------------------responseBody: ', responseBody);

  response.writeHead(response.statusCode, headers);
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
