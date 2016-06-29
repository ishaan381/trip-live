var currentMap;

var daysObj = {
  day1: {
    markers: [],

  }
};

var markers = [];

$(function initializeMap() {

    var fullstackAcademy = new google.maps.LatLng(40.705086, -74.009151);

    var styleArr = [{
        featureType: 'landscape',
        stylers: [{ saturation: -100 }, { lightness: 60 }]
    }, {
        featureType: 'road.local',
        stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
    }, {
        featureType: 'transit',
        stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
    }, {
        featureType: 'administrative.province',
        stylers: [{ visibility: 'off' }]
    }, {
        featureType: 'water',
        stylers: [{ visibility: 'on' }, { lightness: 30 }]
    }, {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [{ color: '#ef8c25' }, { lightness: 40 }]
    }, {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ visibility: 'off' }]
    }, {
        featureType: 'poi.park',
        elementType: 'geometry.fill',
        stylers: [{ color: '#b6c54c' }, { lightness: 40 }, { saturation: -40 }]
    }];

    var mapCanvas = document.getElementById('map-canvas');

    currentMap = new google.maps.Map(mapCanvas, {
        center: fullstackAcademy,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: styleArr
    });



});

function objectReturner(type, value) {
    var location
    type.forEach(function(val) {

        if (val.name == value) location = val.place.location;
    })

    return location;
}

var iconURLs = {
    hotel: '/images/lodging_0star.png',
    restaurant: '/images/restaurant.png',
    activity: '/images/star-3.png'
};

function drawMarker(type, coords) {
    console.log(coords)
    var latLng = new google.maps.LatLng(coords[0], coords[1]);
    var iconURL = iconURLs[type];
    var marker = new google.maps.Marker({
        icon: iconURL,
        position: latLng
    });
    markers.push(marker);
    console.log(markers);


    marker.setMap(currentMap);
}

function removeMarkers(index) {
    markers[index].setMap(null);

}

// drawMarker('hotel', [40.705137, -74.007624]);
// drawMarker('restaurant', [40.705137, -74.013940]);
// drawMarker('activity', [40.716291, -73.995315]);


var num = 0;
$(document).ready(function() {

    var button = '<button class="btn btn-xs btn-danger remove btn-circle">x</button>'

    hotels.forEach(function(hotel) {
        var hotelHtml = '<option>' + hotel.name + '</option>'
        $('#hotel-choices').append(hotelHtml);
    })

    restaurants.forEach(function(restaurant) {
        var restaurantHtml = '<option>' + restaurant.name + '</option>'
        $('#restaurant-choices').append(restaurantHtml);
    })

    activities.forEach(function(activity) {
        var activityHtml = '<option>' + activity.name + '</option>'
        $('#activity-choices').append(activityHtml);
    })



    $('#hotel-name').on('click', function() {
        // $('#list-hotel').empty();
        var hotelName = $('#hotel-choices option:selected').val();
        var hotel = '<p>' + hotelName + button + '</p>'
        var hotelAdded = $(hotel).appendTo('#list-hotel');
        hotelAdded.data('index', num);
        num++;
        var location = objectReturner(hotels, hotelName);
        var newMarker = drawMarker('hotel', location);
        // drawMarker('hotel', );
    })



    $('#restaurant-name').on('click', function() {
        // if($('#list-restaurant').children().length < 5) {
        var restaurantName = $('#restaurant-choices option:selected').val();
        var restaurant = '<p>' + restaurantName + button + '</p>';
        var restaurantAdded = $(restaurant).appendTo('#list-restaurant');
        // drawMarker('restaurant', );
        restaurantAdded.data('index', num);
        num++;
        // }
        var location = objectReturner(restaurants, restaurantName);
        drawMarker('restaurant', location);
        // else return;
    })

    $('#activity-name').on('click', function() {
        // $('#list-activity').empty();
        var activityName = $('#activity-choices option:selected').val();
        var activity = '<p>' + activityName + button + '</p>';
        var activityAdded = $(activity).appendTo('#list-activity');
        // drawMarker('activity', );
        activityAdded.data('index', num);
        num++;

        var location = objectReturner(activities, activityName);
        drawMarker('activity', location);


    })

    $('#itinerary').on('click', '.remove', function() {
        var i = $(this).parent().data('index');
        //setMapOnAll(null)
        removeMarkers(i);
        $(this).parent().remove();
    })

    $('#day-add').on('click', function() {
        var current = $(this).parent().children().length;
        $(this).before('<button class="btn btn-circle day-btn">' + current + '</button>')
    });

})
