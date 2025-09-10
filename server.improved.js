const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000

let meals = [
  // 2025-09-08
  {
    id: "dummy5",
    date: "2025-09-08",
    meal: "breakfast",
    foodName: "Bagel",
    quantity: 1,
    unit: "item(s)",
    calories: 250
  },
  {
    id: "dummy6",
    date: "2025-09-08",
    meal: "lunch",
    foodName: "Turkey Sandwich",
    quantity: 1,
    unit: "item(s)",
    calories: 400
  },
  {
    id: "dummy7",
    date: "2025-09-08",
    meal: "dinner",
    foodName: "Salmon",
    quantity: 6,
    unit: "oz(s)",
    calories: 350
  },
  // 2025-09-09
  {
    id: "dummy3",
    date: "2025-09-09",
    meal: "dinner",
    foodName: "Steak",
    quantity: 8,
    unit: "oz(s)",
    calories: 600
  },
  {
    id: "dummy4",
    date: "2025-09-09",
    meal: "snack",
    foodName: "Apple",
    quantity: 1,
    unit: "item(s)",
    calories: 95
  },
  {
    id: "dummy8",
    date: "2025-09-09",
    meal: "breakfast",
    foodName: "Eggs",
    quantity: 2,
    unit: "item(s)",
    calories: 180
  },
  // 2025-09-10
  {
    id: "dummy1",
    date: "2025-09-10",
    meal: "breakfast",
    foodName: "Oatmeal",
    quantity: 1,
    unit: "cup(s)",
    calories: 150
  },
  {
    id: "dummy2",
    date: "2025-09-10",
    meal: "lunch",
    foodName: "Chicken Salad",
    quantity: 1,
    unit: "lb(s)",
    calories: 350
  },
  {
    id: "dummy9",
    date: "2025-09-10",
    meal: "dinner",
    foodName: "Pasta",
    quantity: 2,
    unit: "cup(s)",
    calories: 400
  },
  // 2025-09-11
  {
    id: "dummy10",
    date: "2025-09-11",
    meal: "breakfast",
    foodName: "Pancakes",
    quantity: 3,
    unit: "item(s)",
    calories: 350
  },
  {
    id: "dummy11",
    date: "2025-09-11",
    meal: "lunch",
    foodName: "Caesar Salad",
    quantity: 1,
    unit: "bowl(s)",
    calories: 320
  },
  {
    id: "dummy12",
    date: "2025-09-11",
    meal: "dinner",
    foodName: "Pizza",
    quantity: 2,
    unit: "slice(s)",
    calories: 500
  }
];

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
    case "/meals": {
      // Group meals by date and add total calories per day
      const grouped = {};
      meals.forEach(meal => {
        if (!grouped[meal.date]) grouped[meal.date] = { meals: [], totalCalories: 0 };
        grouped[meal.date].meals.push(meal);
        grouped[meal.date].totalCalories += Number(meal.calories) || 0;
      });
      response.writeHead(200, "OK", {"Content-Type": "application/json" });
      response.end(JSON.stringify(grouped));
      break;
    }
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
    let result = {};
    switch (request.url) {
      case "/submit": {
        const receivedData = JSON.parse(dataString);
        // Add a unique id for editing/deleting
        receivedData.id = Date.now() + Math.random().toString(36).slice(2);
        meals.push({ ...receivedData, date: new Date().toISOString().split('T')[0] });
        result = { status: "added", meals };
        break;
      }
      case "/delete": {
        const { id } = JSON.parse(dataString);
        meals = meals.filter(meal => meal.id !== id);
        result = { status: "deleted", meals };
        break;
      }
      case "/update": {
        const updated = JSON.parse(dataString);
        meals = meals.map(meal => meal.id === updated.id ? { ...meal, ...updated } : meal);
        result = { status: "updated", meals };
        break;
      }
      default:
        response.writeHead(404, "Not Found", {"Content-Type": "text/plain" });
        response.end("404 Not Found");
        return;
    }
    // Respond with updated grouped data
    const grouped = {};
    meals.forEach(meal => {
      if (!grouped[meal.date]) grouped[meal.date] = { meals: [], totalCalories: 0 };
      grouped[meal.date].meals.push(meal);
      grouped[meal.date].totalCalories += Number(meal.calories) || 0;
    });
    response.writeHead(200, "OK", {"Content-Type": "application/json" });
    response.end(JSON.stringify(grouped));
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
