const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000

const meals = [
  {
    date: "2024-09-06",
    meal: "breakfast",
    foodName: "Oatmeal",
    quantity: 1,
    unit: "cup(s)",
    calories: 150
  },
  {
    date: "2024-09-06",
    meal: "lunch",
    foodName: "Chicken Salad",
    quantity: 1,
    unit: "lb(s)",
    calories: 350
  },
  {
    date: "2024-09-06",
    meal: "dinner",
    foodName: "Steak",
    quantity: 8,
    unit: "oz(s)",
    calories: 600
  },
  {
    date: "2024-09-06",
    meal: "snack",
    foodName: "Apple",
    quantity: 1,
    unit: "item(s)",
    calories: 95
  }
]

const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )    
  }else if( request.method === "POST" ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === "/" ) {
    sendFile( response, "public/index.html" )
  }else{
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

    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end("test")
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
