const numResults = 4;
let geocoder = null;
let customerMarker = null;
const markers = [];
let closest = [];
let earlyVoteLocations;

function getEarlyVotingLocations() {
  let xmlhttp = new XMLHttpRequest();
  let url = 'az.json';
  if (location.host.indexOf('.') > 0) {
    url = location.host.split('.')[0] + '.json';
    console.log(url);
  }
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      earlyVoteLocations = JSON.parse(this.responseText);
      initialize();
    }
    else {
      console.error('something went wrong loading url ', url);
      if (url != 'az.json') {
        url = 'az.json';
        xmlhttp.open('GET', url, true);
        xmlhttp.send();      
      };
    }
  };
  xmlhttp.open('GET', url, true);
  xmlhttp.send();
}


function initialize() {
  alert('Let\'s find your closest early voting location. To do this you will need to allow us to access your current location. Please allow this when asked. We are only using this information to help find the closest voting location.');
  geocoder = new google.maps.Geocoder();

  const map = new google.maps.Map(document.getElementsByClassName('map')[0], {
    zoom: 2,
    center: {
      lat: 32.7584125,
      lng: -97.3158016
    },
    componentRestrictions: {
      country: 'us'
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  const infoWindow = new google.maps.InfoWindow();
  let marker, i;
  const bounds = new google.maps.LatLngBounds();

  for (i = 0; i < earlyVoteLocations.length; i++) {
    let h = '';
    h += '<strong>' + earlyVoteLocations[i][1] + '</strong><br />';
    h += earlyVoteLocations[i][2] + ' ' + earlyVoteLocations[i][3] + '<br />';
    h += earlyVoteLocations[i][4] + ', ' + earlyVoteLocations[i][5] + ' ' + earlyVoteLocations[i][6];
    marker = new google.maps.Marker({
      position: {
        lat: earlyVoteLocations[i][7],
        lng: earlyVoteLocations[i][8]
      },
      map: map,
      animation: google.maps.Animation.DROP,
      html: h,
    });
    markers.push(marker);
    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        infoWindow.setContent(marker.html);
        infoWindow.open(map, marker);
      }
    })
    (marker, i));
  }
  getDeviceLocation (map, bounds, infoWindow, findClosestN);
}

function getDeviceLocation(map, bounds, infoWindow, findClosestN) {
  try {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        findClosestN(map, bounds, pos, numResults);
      }, function () {
        showAllLocations(map, bounds);
      });
    } else {
      showAllLocations(map, bounds);
    }      
  } catch (error) {
    showAllLocations(map, bounds);
  }

}

function showAllLocations(map, bounds) {
  alert('Sorry, we were unable to find your location, however, here are all the voting locations in your district.');
  for (i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    bounds.extend(new google.maps.LatLng(markers[i].getPosition().lat(), markers[i].getPosition().lng()));
  }
  map.fitBounds(bounds);
}

function findClosestN(map, bounds, pt, numberOfResults) {
  var closest = [];
  pt = new google.maps.LatLng(pt.lat, pt.lng);
  for (var i = 0; i < markers.length; i++) {
    pos = new google.maps.LatLng(markers[i].position.lat(), markers[i].position.lng());
    markers[i].distance = google.maps.geometry.spherical.computeDistanceBetween(pt, pos);
    markers[i].setMap(null);
    closest.push(markers[i]);
  }
  closest.sort(sortByDist);
  closest.unshift(new google.maps.Marker({
    position: pt,
    map: map,
    icon: 'https://maps.google.com/mapfiles/kml/pushpin/grn-pushpin.png',
    html: "You Are Here"
  }));
  const closestArr = closest.splice(0, numberOfResults + 1);
  for (i = 0; i < closestArr.length; i++) {
    closestArr[i].setMap(map);
    bounds.extend(new google.maps.LatLng(closestArr[i].getPosition().lat(), closestArr[i].getPosition().lng()));
  }
  map.fitBounds(bounds);
  return closestArr;
}

function sortByDist(a, b) {
  return (a.distance - b.distance)
}