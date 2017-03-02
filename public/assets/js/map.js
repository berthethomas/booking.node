var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize(dep, arr) {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var chicago = new google.maps.LatLng(47.3590900, 3.3852100);
    var mapOptions = {
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: chicago
    }
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    directionsDisplay.setMap(map);
    calcRoute1(dep, arr);
}

function calcRoute1(dep, arr) {
    var start = dep;
    var end = arr;

    var request = {
        origin: start,
        destination: end,
        provideRouteAlternatives: true,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function (result, status, distance) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);

        }
    });
}
