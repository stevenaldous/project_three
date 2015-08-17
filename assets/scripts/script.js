$(document).ready(function(){


    L.mapbox.accessToken = "pk.eyJ1IjoiZ3JvdXB0d28iLCJhIjoiOTYyMjYwM2ExYjU0" +
                           "MTNlNzMwMmYxZDhmNTNlMzBiZDIifQ.uILo4IfMpqra-O-NpKkbqw";
    var map = L.mapbox.map("map", "grouptwo.e32d16b4");
    map.setView([47.6097,-122.3331], 12);


// add empty layer to map
    var foursquarePlaces = L.layerGroup().addTo(map);

// grab container for search results
    var listings = document.querySelector(".listings");


// loop through results and create map markers, add to map
// note the venue name is stored in the marker both for accessability
// and to grab later on when creating the list of results
    for (var i = 0; i < window.app.response.venues.length; i++) {
      var venue = window.app.response.venues[i];
      var latlng = L.latLng(venue.location.lat, venue.location.lng);
      var marker = L.marker(latlng, {
          icon: L.mapbox.marker.icon({
            'marker-color': '#800000',
            'marker-symbol': 'marker',
            'marker-size': 'medium'
          }), 'title': venue.name, 
        })
      .bindPopup('<strong><a href="https://foursquare.com/v/' + venue.id + '">' +
        venue.name + '</a></strong>')
        .addTo(foursquarePlaces);
    }

// loop through layeers, grabing info from each layer and building
// a list item with it
    foursquarePlaces.eachLayer(function(layer) {
      var listing = listings.appendChild(document.createElement('div'));
      listing.className = 'item';
      var link = listing.appendChild(document.createElement('a'));
      link.href = '#';
      link.className = 'title';
      link.innerHTML = layer._icon.title;
      link.onclick = function() {
             map.setView(layer.getLatLng(), 14);
             layer.openPopup();
             // kills the link functionality so it doesn't just to the top
             // of the page
             return false;
          };
      });

});
