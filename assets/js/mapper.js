$(document).ready(function(){

function drawMap(mapData, api){
  // Builds the map container
      $(".map-container").append("<div class='jumbotron' id='map'></div>");

      L.mapbox.accessToken = "pk.eyJ1IjoiZ3JvdXB0d28iLCJhIjoiOTYyMjYwM2ExYjU0" +
                             "MTNlNzMwMmYxZDhmNTNlMzBiZDIifQ.uILo4IfMpqra-O-NpKkbqw";

    // initializes a map in the container created above
      var map = L.mapbox.map("map", "grouptwo.e32d16b4");
      map.setView([47.6097,-122.3331], 12);


  // add empty layer to map
      var myMapLayers = L.layerGroup().addTo(map);

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
                "marker-color": "#800000",
                "marker-symbol": "marker",
                "marker-size": "medium"
              }),
              "title": venue.name,
              "idx" : i
            })
          .bindPopup("<strong><a href='https://foursquare.com/v/" + venue.id +
                     "' target='blank'>" + venue.name + "</a></strong>")
            .addTo(myMapLayers);
        }

      // loop through layers, grabing info from each layer and building
      // a list item with it
      myMapLayers.eachLayer(function(layer) {
        // console.log(layer);
        var listing = listings.appendChild(document.createElement("div"));
        listing.className = "item";
        var link = listing.appendChild(document.createElement("a"));
        link.href = "#";
        // link.className = 'title';
        link.innerHTML = mapData.response.venues[layer.options.idx].name;
        listing.appendChild(document.createElement("br"));

        var description = listing.appendChild(document.createElement("span"));
        description.innerHTML = mapData.response.venues[layer.options.idx].categories[0].name;
        listing.appendChild(document.createElement("br"));

        var foursquareLink = listing.appendChild(document.createElement("a"));
        foursquareLink.href="https://foursquare.com/v/" + mapData.
                             response.venues[layer.options.idx].id;
        foursquareLink.innerHTML = "View on Foursquare"

        var foursquareObj = {};
        foursquareObj.name = mapData.response.venues[layer.options.idx].name;
        foursquareObj.apiId = mapData.response.venues[layer.options.idx].id;
        foursquareObj.lat = mapData.response.venues[layer.options.idx].location.lat
        foursquareObj.lng = mapData.response.venues[layer.options.idx].location.lng
        foursquareObj.address = mapData.response.venues[layer.options.idx].location.address
        foursquareObj.city = mapData.response.venues[layer.options.idx].location.city
        foursquareObj.state = mapData.response.venues[layer.options.idx].location.state;
        foursquareObj.zip = mapData.response.venues[layer.options.idx].location.postalCode
        foursquareObj.dateID = $("#dateID").val();
        foursquareObj.url = "https://foursquare.com/v/" + mapData.
                             response.venues[layer.options.idx].id;



        var foursquareForm = formCreator(foursquareObj);

        listing.appendChild(foursquareForm);


        link.onclick = function() {
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
                "marker-color": "#800000",
                "marker-symbol": "marker",
                "marker-size": "medium"
              }),
              "title": event.title,
              "idx" : i
            })
          .bindPopup("<strong><a href='" + event.url + "' target='blank'>" +
            event.title + "</a></strong>")
            .addTo(myMapLayers);
        }

      // loop through layers, grabing info from each layer and building
      // a list item with it
      myMapLayers.eachLayer(function(layer) {
        // console.log(layer);
        var listing = listings.appendChild(document.createElement("div"));
        listing.className = "item";
        var link = listing.appendChild(document.createElement("a"));
        link.href = "#";
        // link.className = 'title';
        link.innerHTML = mapData.events.event[layer.options.idx].title;
        listing.appendChild(document.createElement("br"));

        var eventfulObj = {};
        eventfulObj.name = mapData.events.event[layer.options.idx].title;
        eventfulObj.apiId = mapData.events.event[layer.options.idx].id;
        eventfulObj.lat = mapData.events.event[layer.options.idx].latitude;
        eventfulObj.lng = mapData.events.event[layer.options.idx].longitude;
        eventfulObj.address = mapData.events.event[layer.options.idx].venue_address;
        eventfulObj.city = mapData.events.event[layer.options.idx].city_name;
        eventfulObj.state = mapData.events.event[layer.options.idx].region_abbr;
        eventfulObj.zip = mapData.events.event[layer.options.idx].postal_code;
        eventfulObj.dateID = $("#dateID").val();
        eventfulObj.url = mapData.events.event[layer.options.idx].url;

        var description_container = listing.appendChild(document
                                                        .createElement("div"));
        description_container.setAttribute("class", "truncated_text");
        var description = description_container.appendChild(document
                                                            .createElement("span"));
        description.innerHTML = mapData.events.event[layer.options.idx].description;
        listing.appendChild(document.createElement("br"));



        var eventfulLink = listing.appendChild(document.createElement("a"));
        eventfulLink.href= mapData.events.event[layer.options.idx].url;
        eventfulLink.innerHTML = "View on Eventful";


        var eventfulForm = formCreator(eventfulObj);

        listing.appendChild(eventfulForm);

        link.onclick = function() {
              // console.log('item data',mapData.events.event[layer.options.idx])
               map.setView(layer.getLatLng(), 14);
               layer.openPopup();
               // kills the link functionality so it doesn't just to the top
               // of the page
               return false;
            };
        });
    }
  }

  $('#searchBtn1').on("click", function(e) {
      e.preventDefault();

      // If DOM element linked to map exits,
      // remove that element from the DOM
      if (typeof map != "undefined") {
        map.remove();
      }

      // Erase whatever is in the results list container
      $(".listings").html("");

      // AJAX call to backend for the data
      var searchTerm = $("#restaurant").val();
      $.getJSON("/dates/results?what=" + searchTerm, function(searchData) {
          drawMap(searchData, "foursquare");
      });
  });


  $('#searchBtn2').on("click", function(e) {
      e.preventDefault();

      // If DOM element linked to map exits,
      // remove that element from the DOM
      if (typeof map != "undefined") {
        map.remove();
      }

      // Erase whatever is in the results list container
      $(".listings").html("");

      // AJAX call to backend for the data
      var searchTerm = $("#not-restaurant").val();
      $.getJSON("/dates/eventsResults?keywords=" + searchTerm, function(searchData) {
          drawMap(searchData, "eventful");
          var maxHeight = 75;
          var showText = "more";
          var hideText = "less";

          $(".truncated_text").each(function(){
            var text = $(this);
            if (text.height() > maxHeight){
              text.css({"overflow": "hidden", "height": maxHeight + "px"});
              var moreLink = $("<a href='#'>" + showText + "</a>");
              var moreLinkDiv = $("<div></div>");
              moreLinkDiv.append(moreLink);
              $(this).after(moreLinkDiv);

              moreLink.on("click", function(e){
                e.preventDefault();
                if (text.height() > maxHeight) {
                  $(this).html(showText);
                  text.css("height", maxHeight + "px");
                } else {
                  $(this).html(hideText);
                  text.css("height", "auto");
                }
              });
            }
          });
      });

  });

  $(".listings").on("submit", "form", function(e){
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/dates/" + $("#dateID").val() + "/search" ,
      data: $(this).serialize(),
      success: function(response){
        console.log(response);
      }
    });
  });



}); // end doc.ready function

var formCreator = function(values){
  var form = document.createElement("form");

  for (var keyName in values) {
      var formField = form.appendChild(document.createElement("input"));
        formField.setAttribute("name", keyName);
        formField.setAttribute("type", "hidden");
        formField.setAttribute("value", values[keyName]);
  }

  var button = form.appendChild(document.createElement("button"))
  button.setAttribute("type", "submit");
  button.setAttribute("class","btn btn-primary");
  button.setAttribute("id","add-to-date");
  button.innerHTML = "+";


  return form;
};



