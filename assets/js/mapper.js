$(document).ready(function(){

function drawMap(mapData){
  // Builds the map container
      $(".container").append("<div class='jumbotron' id='map'></div>");

      L.mapbox.accessToken = "pk.eyJ1IjoiZ3JvdXB0d28iLCJhIjoiOTYyMjYwM2ExYjU0" +
                             "MTNlNzMwMmYxZDhmNTNlMzBiZDIifQ.uILo4IfMpqra-O-NpKkbqw";
      
    // initializes a map in the container created above
      var map = L.mapbox.map("map", "grouptwo.e32d16b4");
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

  // loop through layers, grabing info from each layer and building
  // a list item with it
      foursquarePlaces.eachLayer(function(layer) {
        // console.log(layer);
        var listing = listings.appendChild(document.createElement('div'));
        listing.className = 'item';
        var link = listing.appendChild(document.createElement('a'));
        link.href = '#';
        link.className = 'title';
        link.innerHTML = layer._icon.title;
        link.onclick = function() {
              console.log('item data',mapData.response.venues[layer.options.idx])
               map.setView(layer.getLatLng(), 14);
               layer.openPopup();
               // kills the link functionality so it doesn't just to the top
               // of the page
               return false;
            };
        });
}



  $('.searchBtn').on('click', function(e) {
      e.preventDefault();

      // If DOM element linked to map exits, 
      // remove that element from the DOM
      if (typeof map != "undefined") {
        map.remove();
      }

      // Erase whatever is in the results list container
      $(".listings").html("");

      // AJAX call to backend for the data
      var searchTerm = $('#restaurant').val();
      $.getJSON('/results?what=' + searchTerm, function(searchData) {
          drawMap(searchData);
      });
  });


});

