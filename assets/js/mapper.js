 $(document).ready(function(){
var map = undefined;
function drawMap(mapData){

      L.mapbox.accessToken = "pk.eyJ1IjoiZ3JvdXB0d28iLCJhIjoiOTYyMjYwM2ExYjU0" +
                             "MTNlNzMwMmYxZDhmNTNlMzBiZDIifQ.uILo4IfMpqra-O-NpKkbqw";
      map = L.mapbox.map("map", "grouptwo.e32d16b4");
      map.setView([47.6097,-122.3331], 12);


  // add empty layer to map
      var foursquarePlaces = L.layerGroup().addTo(map);

  // grab container for search results
      var listings = document.querySelector(".listings");


  // loop through results and create map markers, add to map
  // note the venue name is stored in the marker both for accessability
  // and to grab later on when creating the list of results
      for (var i = 0; i < mapData.response.venues.length; i++) {
        var venue = mapData.response.venues[i];
        var latlng = L.latLng(venue.location.lat, venue.location.lng);
        var marker = L.marker(latlng, {
            icon: L.mapbox.marker.icon({
              'marker-color': '#800000',
              'marker-symbol': 'marker',
              'marker-size': 'medium'
            }),
            'title': venue.name,
            'idx' : i
          })
        .bindPopup('<strong><a href="https://foursquare.com/v/' + venue.id + '">' +
          venue.name + '</a></strong>')
          .addTo(foursquarePlaces);
      }

  // loop through layeers, grabing info from each layer and building
  // a list item with it
    //   foursquarePlaces.eachLayer(function(layer) {
    //     // console.log(layer);
    //     var listing = listings.appendChild(document.createElement('div'));
    //     listing.className = 'item';
    //     var link = listing.appendChild(document.createElement('a'));
    //     link.href = '#';
    //     link.className = 'title';
    //     link.innerHTML = layer._icon.title;
    //     link.onclick = function() {
    //           console.log('item data',mapData.response.venues[layer.options.idx])
    //            map.setView(layer.getLatLng(), 14);
    //            layer.openPopup();
    //            // kills the link functionality so it doesn't just to the top
    //            // of the page
    //            return false;
    //         };
    //     });
return foursquarePlaces;
}
$('.searchBtn').on('click', function(e) {
    e.preventDefault();
    var searchTerm = $('#restaurant').val();
async.series([
    function(callback){

    if (map) $('#map').remove();
    $('div#site-container.container').append(
    '<div class="jumbotron" id="map"></div><div class="listings"></div>')
        // do some stuff ...
        callback(null, 'one');
    },

    function(callback){
    $.getJSON('/results?what=' + searchTerm, function(searchData) {

        console.log(searchData);
        drawMap(searchData);
        // do some more stuff ...
        callback(null, 'two');
    })
    }
],
function(err, results){
    // results is now equal to ['one', 'two']
});
})

// optional callback
  });

//$('.myform').on('submit'...)
