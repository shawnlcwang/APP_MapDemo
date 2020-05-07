/*
 * 1. Google Map Places API for My Favourite Restaurant: 
*/ 
// https://maps.googleapis.com/maps/api/place/textsearch/json?query=SuraKoreanRestaurant&key=AIzaSyCdj1_BDkG85qRAPlY9L93f4DVV4EQ5DOQ

/*
 * 2. Map Demo Application: Google Map Places API for My Favourite Restaurant
*/ 
// viewable in Chrome/Firefox/Edge
var map;
var service;
var infoWindow; 

function initMap() {
    // Basemap environment
    var victoria = new google.maps.LatLng(48.4284, -123.3656);
    var options = {
        // center: {lat: 48.4284, lng: -123.3656},
        center: victoria,
        zoom: 12, 
        mapTypeId: google.maps.MapTypeId.HYBRID
    }; 

    // Create map 
    map = new google.maps.Map(document.getElementById('map'), options);

    // POI Approach 1: 
    // Create info window 
    infoWindow = new google.maps.InfoWindow(); 

    var request = {
        query: 'Sura Korean Restaurant',
        fields: ['name', 'geometry'],
      };

    service = new google.maps.places.PlacesService(map);

    service.findPlaceFromQuery(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
          map.setCenter(results[0].geometry.location);
        }
    });

    // POI Approach 2: 
    // Create search box 
    var input = document.getElementById('search'); 
    var searchBox = new google.maps.places.SearchBox(input); 
    
    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function(){
        searchBox.setBounds(map.getBounds()); 
    }); 

    var markers = []; 

    // Listen for the event fired when the user selects a prediction and retrieve more details for that place
    searchBox.addListener('places_changed', function(){
        var places = searchBox.getPlaces(); 
        
        if (places.length === 0){
            return; 
        }

        // Clear out the old markers
        markers.forEach(function(m){
            m.setMap(null); 
        }); 
        markers = []; 

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds(); 
        places.forEach(function(p){
            if(!p.geometry){
                console.log("Returned place contains no geometry");
                return; 
            }

            // Create a marker for each place
            markers.push(new google.maps.Marker({
                map: map, 
                position: p.geometry.location
            })); 
            if (p.geometry.viewport){
                bounds.union(p.geometry.viewport); 
            }else{
                bounds.extend(p.geometry.location); 
            }
            map.fitBounds(bounds); 
        });
    });
}

function createMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent('<div><strong>' + place.name + '</strong><br>' +
        'Location Coordinates: ' + place.geometry.location + '</div>');
        infoWindow.open(map, this);
    });
}

/*
 * 3. Map Demo Application Deployment: Heroku
*/ 
// require additional server app.js and JS Dev-environment 