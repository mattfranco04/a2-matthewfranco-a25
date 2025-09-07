const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000

const meals = [];

const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )    
  }else if( request.method === "POST" ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  switch (request.url) {
    case "/":
      sendFile( response, "public/index.html" )
      break;
    case "/meals":
      response.writeHead(200, "OK", {"Content-Type": "text/plain" });
      response.end(meals.map(meal => `${meal.date} - ${meal.meal}: ${meal.foodName}, ${meal.quantity} ${meal.unit}, ${meal.calories} calories`).join("\n"));
      break;
    default:
      sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {
    console.log( JSON.parse( dataString ) )

    switch (request.url) {
      case "/submit":
        const receivedData = JSON.parse(dataString);
        console.log("Received data:", receivedData);
        meals.push(receivedData);
        break;
      default:
        response.writeHead(404, "Not Found", {"Content-Type": "text/plain" });
        response.end("404 Not Found")
    }
   
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we"ve loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { "Content-Type": type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( "404 Error: File Not Found" )

     }
   })
}

server.listen( process.env.PORT || port )
