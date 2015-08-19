$(document).ready(function(){

function drawMap(mapData, api){
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

      if (api === "foursquare") {
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
        var form = listing.appendChild(document.createElement("form"));
        form.setAttribute("method", "post");
        form.setAttribute("action", "/dates/search");
        var formField = form.appendChild(document.createElement("input"));
        formField.setAttribute("name", "name");
        formField.setAttribute("type", "hidden");
        formField.setAttribute("value", mapData.response
                                        .venues[layer.options.idx].name);

        var formField2 = form.appendChild(document.createElement("input"));
        formField2.setAttribute("name", "apiId");
        formField2.setAttribute("type", "hidden");
        formField2.setAttribute("value", mapData.response
                                        .venues[layer.options.idx].id);

        var formField3 = form.appendChild(document.createElement("input"));
        formField3.setAttribute("name", "lat");
        formField3.setAttribute("type", "hidden");
        formField3.setAttribute("value", mapData.response
                                        .venues[layer.options.idx].location.lat);

        var formField4 = form.appendChild(document.createElement("input"));
        formField4.setAttribute("name", "lng");
        formField4.setAttribute("type", "hidden");
        formField4.setAttribute("value", mapData.response
                                        .venues[layer.options.idx].location.lng);

        var formField5 = form.appendChild(document.createElement("input"));
        formField5.setAttribute("name", "address");
        formField5.setAttribute("type", "hidden");
        formField5.setAttribute("value", mapData.response
                                        .venues[layer.options.idx].location.address);

        var formField6 = form.appendChild(document.createElement("input"));
        formField6.setAttribute("name", "city");
        formField6.setAttribute("type", "hidden");
        formField6.setAttribute("value", mapData.response
                                        .venues[layer.options.idx].location.city);

        var formField7 = form.appendChild(document.createElement("input"));
        formField7.setAttribute("name", "state");
        formField7.setAttribute("type", "hidden");
        formField7.setAttribute("value", mapData.response
                                        .venues[layer.options.idx].location.state);

        var formField8 = form.appendChild(document.createElement("input"));
        formField8.setAttribute("name", "zip");
        formField8.setAttribute("type", "hidden");
        formField8.setAttribute("value", mapData.response
                                        .venues[layer.options.idx].location.postalCode);

        var button = form.appendChild(document.createElement("button"))
        button.setAttribute("type", "submit");
        button.innerHTML = "Add to Date";

        link.onclick = function() {
              console.log('item data',mapData.response.venues[layer.options.idx])
               map.setView(layer.getLatLng(), 14);
               layer.openPopup();
               // kills the link functionality so it doesn't just to the top
               // of the page
               return false;
            };
        });

    } else if (api === "eventful"){
        for (var i = 0; i < mapData.events.event.length; i++) {
          var event = mapData.events.event[i];
          var latlng = L.latLng(event.latitude, event.longitude);
          var marker = L.marker(latlng, {
              icon: L.mapbox.marker.icon({
                'marker-color': '#800000',
                'marker-symbol': 'marker',
                'marker-size': 'medium'
              }),
              'title': event.title,
              'idx' : i
            })
          .bindPopup('<strong><a href="' + event.url + '">' +
            event.title + '</a></strong>')
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

        var form = listing.appendChild(document.createElement("form"));
        form.setAttribute("method", "post");
        form.setAttribute("action", "/dates/search");
        var formField = form.appendChild(document.createElement("input"));
        formField.setAttribute("name", "name");
        formField.setAttribute("type", "hidden");
        formField.setAttribute("value", mapData.events.event[layer.options.idx].title);

        var formField2 = form.appendChild(document.createElement("input"));
        formField2.setAttribute("name", "apiId");
        formField2.setAttribute("type", "hidden");
        formField2.setAttribute("value", mapData.events.event[layer.options.idx].id);

        var formField3 = form.appendChild(document.createElement("input"));
        formField3.setAttribute("name", "lat");
        formField3.setAttribute("type", "hidden");
        formField3.setAttribute("value", mapData.events.event[layer.options.idx].latitude);

        var formField4 = form.appendChild(document.createElement("input"));
        formField4.setAttribute("name", "lng");
        formField4.setAttribute("type", "hidden");
        formField4.setAttribute("value", mapData.events.event[layer.options.idx].longitude);

        var formField5 = form.appendChild(document.createElement("input"));
        formField5.setAttribute("name", "address");
        formField5.setAttribute("type", "hidden");
        formField5.setAttribute("value", mapData.events.event[layer.options.idx].venue_address);

        var formField6 = form.appendChild(document.createElement("input"));
        formField6.setAttribute("name", "city");
        formField6.setAttribute("type", "hidden");
        formField6.setAttribute("value", mapData.events.event[layer.options.idx].city_name);

        var formField7 = form.appendChild(document.createElement("input"));
        formField7.setAttribute("name", "state");
        formField7.setAttribute("type", "hidden");
        formField7.setAttribute("value", mapData.events.event[layer.options.idx].region_abbr);

        var formField8 = form.appendChild(document.createElement("input"));
        formField8.setAttribute("name", "zip");
        formField8.setAttribute("type", "hidden");
        formField8.setAttribute("value", mapData.events.event[layer.options.idx].postal_code);

        var button = form.appendChild(document.createElement("button"))
        button.setAttribute("type", "submit");
        button.innerHTML = "Add to Date";

        link.onclick = function() {
              console.log('item data',mapData.events.event[layer.options.idx])
               map.setView(layer.getLatLng(), 14);
               layer.openPopup();
               // kills the link functionality so it doesn't just to the top
               // of the page
               return false;
            };
        });
    }
}

  $('#searchBtn1').on('click', function(e) {
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
      $.getJSON('/dates/results?what=' + searchTerm, function(searchData) {
          drawMap(searchData, "foursquare");
      });
  });


  $('#searchBtn2').on('click', function(e) {
      e.preventDefault();

      // If DOM element linked to map exits, 
      // remove that element from the DOM
      if (typeof map != "undefined") {
        map.remove();
      }

      // Erase whatever is in the results list container
      $(".listings").html("");

      // AJAX call to backend for the data
      var searchTerm = $('#not-restaurant').val();
      $.getJSON('/dates/eventsResults?keywords=' + searchTerm, function(searchData) {
          drawMap(searchData, "eventful");
      });
  });


});

