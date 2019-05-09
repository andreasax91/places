toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

$( document ).ready(function() {

 var karte = L.map('map').setView([48.21, 16.38 ], 11 );
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
   attribution: '&copy; OpenStreetMap'
 }).addTo( karte );

    $.ajax({
        url:'http://localhost:26893/places/66',
        data:{},
        method:'delete'
      })

    $.ajax({
        url:'http://localhost:26893/places/',
        data:{},
        method:'get',
        success:function( response ){
        var orte = response.places; // Array
        if ( Array.isArray( orte) ){
          console.log(orte);
          if(orte.length == 0 ) {
            karte.setView([48.21, 16.38 ], 12);
          }else {

            var bounds = [];

            var table = $('<table border="1">').appendTo('body');
            table.append(
              $('<tr>')
              .append( $('<th>Bezeichnung</th>') )
              .append( $('<th>Lat</th>') )
              .append( $('<th>Lng</th>') )
            );

            for (let i in orte ) {
              var zeile = $ ('<tr>').appendTo(table);
              $('<td>').html(orte[i].title).appendTo(zeile);
              $('<td>').html(orte[i].lat).appendTo(zeile);
              $('<td>').html(orte[i].lng).appendTo(zeile);
              $('<td>').append(
                $('<a href= "#">').html('löschen')
              ).appendTo(zeile);



              var latlng = [
                 orte[i].lat,
                  orte[i].lng
                ];
            L.marker( latlng )
            .addTo( karte )
            .bindPopup( orte[i].title )
            .openPopup();
            bounds.push(latlng);
          }
          karte.fitBounds(bounds);

            //karte.setView([orte[0].lat, orte[0].lng ],2);
          }


        }else {
          // alert('Datenformat Fehler');
          toastr["error"]("Are you the six fingered man?", "Datenformat Fehler")
        }
        },
        error:function(  ){
          alert( 'Verbindungsfehler' );
        },
    });



});
