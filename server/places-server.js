console.log('Places Server Script ');

//npm install express
var express = require('express');
var app = express();
var fs = require('fs');
var bp = require('body-parser');

var app = express();

var places = require('./my_modules/places');

var server = app.listen( 26893, function() {
  console.log('Places Server running on port 26893');
});

app.use( function( request,response,next) {
  response.setHeader('Access-Control-Allow-Origin','*');
  response.setHeader('Access-Control-Allow-Methods','GET, DELETE, POST, PUT');
  next();
});

// app.get('/', function(request, response){
//   response.end('Ich bins, dein Server!');
// });

app.get('/places/', function(request, response){
  places.ladeOrte( function( pl ){ // pl -> ARRAY
    var responseObjekt = {
      'places':pl
    }
    response.setHeader( 'Content-Type', 'application/json' );
    response.end( JSON.stringify(responseObjekt) );
  } );
 
});
app.delete('/places/:id', function( request, response ) {

  console.log( request.params.id );
});
