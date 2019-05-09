
var fs = require('fs');

module.exports = {
  ladeOrte:function( callback ) {

    fs.readFile('places.json', function( err, data ){

      var alleDaten = JSON.parse(data);

      console.log(alleDaten );
        //return alleDaten.places; <-- NEIN, weil async
        callback( alleDaten.places );
    });
  }
}
