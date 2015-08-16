

$(document).ready(function(){


    L.mapbox.accessToken = "pk.eyJ1IjoiZ3JvdXB0d28iLCJhIjoiOTYyMjYwM2ExYjU0" +
                           "MTNlNzMwMmYxZDhmNTNlMzBiZDIifQ.uILo4IfMpqra-O-NpKkbqw";
    var map = L.mapbox.map("map", "grouptwo.e32d16b4");
    map.setView([47.715, -122.312], 12);

    var foursquarePlaces = L.layerGroup().addTo(map);

    console.log(window.app.response);

    for (var i = 0; i < window.app.response.venues.length; i++) {
      var venue = window.app.response.venues[i];
      var latlng = L.latLng(venue.location.lat, venue.location.lng);
      var marker = L.marker(latlng, {
          icon: L.mapbox.marker.icon({
            'marker-color': '#BE9A6B',
            'marker-symbol': 'marker',
            'marker-size': 'large'
          })
        })
      .bindPopup('<strong><a href="https://foursquare.com/v/' + venue.id + '">' +
        venue.name + '</a></strong>')
        .addTo(foursquarePlaces);
    }


});
