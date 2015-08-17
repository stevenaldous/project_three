$(document).ready(function(){


    L.mapbox.accessToken = "pk.eyJ1IjoiZ3JvdXB0d28iLCJhIjoiOTYyMjYwM2ExYjU0" +
                           "MTNlNzMwMmYxZDhmNTNlMzBiZDIifQ.uILo4IfMpqra-O-NpKkbqw";
    var map = L.mapbox.map("map", "grouptwo.e32d16b4");
    map.setView([47.6097,-122.3331], 12);

    var foursquarePlaces = L.layerGroup().addTo(map);

    var listings = document.querySelector(".listings");

    for (var i = 0; i < window.app.response.venues.length; i++) {
      var venue = window.app.response.venues[i];
      var latlng = L.latLng(venue.location.lat, venue.location.lng);
      var marker = L.marker(latlng, {
          icon: L.mapbox.marker.icon({
            'marker-color': '#800000',
            'marker-symbol': 'marker',
            'marker-size': 'medium'
          })
        })
      .bindPopup('<strong><a href="https://foursquare.com/v/' + venue.id + '">' +
        venue.name + '</a></strong>')
        .addTo(foursquarePlaces);

      // var listing = listings.appendChild(document.createElement('div'));
      // listing.className = 'item';

      // var link = listing.appendChild(document.createElement('a'));
      // link.href = '#';
      // link.className = 'title';
      // link.innerHTML = venue.name;

    }

    foursquarePlaces.eachLayer(function(layer) {
      // var listing = listings.appendChild(document.createElement('div'));
      // listing.className = 'item';
      // var link = listing.appendChild(document.createElement('a'));
      // link.href = '#';
      // link.className = 'title';
      // link.innerHTML = venue.name;
      // link.onclick = function() {
      //        map.setView(layer.getLatLng(), 14);
      //        layer.openPopup();
      //     };
      console.log(layer)
      });






});
