// Creating the map object
var myMap = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 11
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

//   // Creating a new marker:
// // We pass in some initial options, and then add the marker to the map by using the addTo() method.
// var marker = L.marker([40.7128, -74.0059], {
//   draggable: true,
//   title: "My First Marker"
// }).addTo(myMap);

// // Binding a popup to our marker
// marker.bindPopup("Hello There!");
  
// Use this link to get the GeoJSON data.
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Getting our GeoJSON data
d3.json(link).then(function(data) {

var features = data.features;

// console.log(features.length);

var markers = L.markerClusterGroup();

for(var i = 0; i < features.length; i++) {
  var location = features[i].geometry.coordinates;

  // console.log(location);
  console.log(features[i].properties.title);

      // Check for the location property.
      if (location) {

        // Add a new marker to the cluster group, and bind a popup.
        markers.addLayer(L.marker([location[1], location[0]])
          // .bindPopup(features[i].properties.title));
          .bindPopup("Magnitude: " + features[i].properties.mag + 
            "<br />Place: : " + features[i].properties.place + 
            "<br />Time: " + new Date(features[i].properties.time).toLocaleString()));
      }
}

  // Creating a GeoJSON layer with the retrieved data
  // L.geoJson(data).addTo(myMap);

  myMap.addLayer(markers);
});

