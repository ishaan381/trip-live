var currentMap;

var currentNum = 1;

function objPropCreator() {
    return {
        markers: [],
        plans: {
            hotels: [],
            restaurants: [],
            activities: []
        },
        num: 0
    }
}

var daysObj = {
    1: objPropCreator()
};

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
    daysObj[currentNum].markers.push(marker);



    marker.setMap(currentMap);
}

function removeMarkers(index) {
    console.log('removeMarkers', daysObj)
    daysObj[currentNum].markers[index].setMap(null);
}

function clearMarkers() {
    daysObj[currentNum].markers.forEach(function(marker) {
        marker.setMap(null);
    })
}

function showMarkers() {
    console.log(currentNum, daysObj[currentNum])
    daysObj[currentNum].markers.forEach(function(marker) {
        marker.setMap(currentMap);
    })
}

function clearPanel() {
    $('#list-hotel').children().remove();
    $('#list-restaurant').children().remove();
    $('#list-activity').children().remove();
}

var panelIds = ['#list-hotel', '#list-restaurant', '#list-activity'];

// function showPanel() {
//   console.log(daysObj[currentNum].plans)
//   var n = 0;
//   for (var events in daysObj[currentNum].plans) {
//     events.forEach(function(plan) {
//       var added = $(plan).appendTo(panelIds[n]);
//       added.data('index', num);
//       num++
//     })
//     n++;
//   }
// }

function showPanel() {
    daysObj[currentNum].plans.hotels.forEach(function(hotel) {
        var added = $(hotel).appendTo('#list-hotel');
        added.data('index', daysObj[currentNum].num);
        daysObj[currentNum].num++;
    })

    daysObj[currentNum].plans.restaurants.forEach(function(restaurant) {
        var added = $(restaurant).appendTo('#list-restaurant');
        added.data('index', daysObj[currentNum].num);
        daysObj[currentNum].num++;
    })

    daysObj[currentNum].plans.activities.forEach(function(activity) {
        var added = $(activity).appendTo('#list-activity');
        added.data('index', daysObj[currentNum].num);
        daysObj[currentNum].num++;
    })
}

// drawMarker('hotel', [40.705137, -74.007624]);
// drawMarker('restaurant', [40.705137, -74.013940]);
// drawMarker('activity', [40.716291, -73.995315]);



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

        daysObj[currentNum].plans.hotels.push(hotel);
        hotelAdded.data('index', daysObj[currentNum].num);
        daysObj[currentNum].num++;
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
        daysObj[currentNum].plans.restaurants.push(restaurant);
        restaurantAdded.data('index', daysObj[currentNum].num);
        daysObj[currentNum].num++;
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
        daysObj[currentNum].plans.activities.push(activity);
        activityAdded.data('index', daysObj[currentNum].num);
        daysObj[currentNum].num++;

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
        $(this).before('<button class="btn btn-circle day-btn" id="current-day">' + current + '</button>')
    });

    $('.panel').on('click', '#current-day', function() {
        if (+$(this).text() == currentNum) return;
        else {
            clearPanel();
            clearMarkers();
            daysObj[currentNum].num = 0;
            currentNum = +$(this).text();
            if (!daysObj[currentNum]) daysObj[currentNum] = objPropCreator();
            $('#day-number').text('Day ' + currentNum.toString());
            showMarkers();
            showPanel();
        }
    })

    $('#day-title').on('click', '#delete-day', function() {
        var currentDay = +$('#day-number').text();
        console.log(daysObj[currentNum]);
        clearPanel();
        clearMarkers();
        for (var keys in daysObj.hasOwnProperty(keys)) {
            console.log(keys);
            if (currentNum <= keys) {
                var next = +keys + 1
                if (daysObj[next]) {
                    console.log('settingVal')
                    daysObj[keys] = daysObj[next]
                } else daysObj[keys] = null;
            }

            console.log('BLUE', daysObj)
        }
        if (currentDay == currentNum) {
            currentNum--;
            var newNum = currentNum - 1;
            $('#day-number').text('Day ' + newNum.toString())
        }
        showMarkers();
        showPanel();
        $('#day-add').prev().remove();

    })

})
