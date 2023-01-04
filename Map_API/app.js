// set map options
// lat and lng where the map will start
var mylatlng = {lat: 25.229117165834023,lng: 55.31796917369405};
//The defullt of the mapp when start
var mapOptions = {
    center: mylatlng,
    zoom: 10,
    //what type of map we want
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
//global variable to get coordinates
var place ="";
//creat map
var map = new google.maps.Map(document.getElementById("googleMap"),mapOptions)

// initialize function to make aoutocomplete for search and get the coordinates 
function initialize() {
    var input = document.getElementById('from');
    var autocomplete = new google.maps.places.Autocomplete(input);
    
    google.maps.event.addListener(autocomplete, 'place_changed', function () 
    {
        place = autocomplete.getPlace();
        console.log(place);
        
    });
}
google.maps.event.addDomListener(window, 'load', initialize); 
// locate function to provid new map whith reqested
function locat(){
    document.getElementById("output").style.display= "none";
    if (document.getElementById("from").value.trim() == "") {
        output.innerHTML = "<div class= 'alert-danger'> Please choose a location to search for </div>";
        document.getElementById("output").style.display= "block";
    } else {
        var mylatlng = {lat: place.geometry.location.lat(), lng:place.geometry.location.lng()};
        //The defullt of the mapp when start
        var mapOptions = {
            center: mylatlng,
            zoom: 10,
            //what type of map we want
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        //create map
        var map = new google.maps.Map(document.getElementById("googleMap"),mapOptions)
    }

}


// Create a Directions service object to use the route method and get a result for our request 

var directionsService = new google.maps.DirectionsService();

function calcRoute(){
    document.getElementById("output").style.display= "block";
    //creat request
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING,//walking, bycycling and transit
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    // Pass the request to the route method
    directionsService.route(request,(result,status) =>{
        if(document.getElementById("from").value.trim() == "" || document.getElementById("to").value.trim() == "") {
            output.innerHTML = "<div class= 'alert-danger'> Please select starting point and destination.  </div>";
        } else {
            if(status == google.maps.DirectionsStatus.OK){

                //get distance and time

                const output = document.querySelector('#output');
                output.innerHTML = "<div style='padding-left:10%; text-align:left !important;'>From :  &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; " + document.getElementById("from").value + " .<br />To:  &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; "+document.getElementById("to").value + ".<br/>Driving distance:    &ensp;"+ result.routes[0].legs[0].distance.text + ".<br/>Duration :   &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;" + result.routes[0].legs[0].duration.text + ". </div>";
            
            }else{
                // center map in amman
                map.setCenter(mylatlng);

                //message error 
                output.innerHTML = "<div class= 'alert-danger'> Could not retrieve driveing distance. </div>";
            }
        }
    });
}

// creat autocomplete objects for destination
function initialize2(){
    var input = document.getElementById("to");
    new google.maps.places.Autocomplete(input);
}
google.maps.event.addDomListener(window, 'load',initialize2);





