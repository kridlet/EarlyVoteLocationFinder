const earlyVoteLocations = [
  ["Bob Duncan Center", "2800 South Center St", "Arlington", "76014", "", 32.69791, -97.11104],
  ["Elize Odom Athletic Center", "1601 NE Green Oaks Blvd", "Arlington", "76006", "", 32.78204, -97.08631],
  ["Center for Community Service Junior League", "4002 West Pioneer Parkway", "Arlington", "76013", "", 32.71564, -97.16999],
  ["South Service Center", "1100 SW Green Oaks Blvd", "Arlington", "76010", "", 32.65783, -97.12943],
  ["Tarrant County Sub Courthouse ", "700 E Abram St", "Arlington", "76010", "", 32.73511, -97.10031],
  ["TCCC SE Campus", "2100 Southeast Parkway", "Arlington", "76018", "Portable Building C", 32.641121, -97.0749988],
  ["BJ Clark Annex", "603 Southeast Parkway", "Azle", "76020", "Room 4", 32.8827466, -97.5365332],
  ["Bedford Public Library", " 2424 Forest Ridge Dr", "Bedford", "76021", "", 32.84611, -97.14218],
  ["Benbrook Community Center", "228 San Angelo Ave", "Benbrook", "76126", "", 32.6810498, -97.4574934],
  ["Colleyville City Hall", "100 Main St", "Colleyville", "76034", "", 32.88501, -97.15714],
  ["Crowley City Hall", "405 S Oak St", "Crowley", "76036", "", 32.5744774, -97.3661854],
  ["Euless Public Library", "201 N Ector Drive", "Euless", "76039", "", 32.83933, -97.0926],
  ["Forest Hill Civic and Convention Center", "6901 Wichita St", "Forest Hill", "76104", "", 32.65509, -97.28232],
  ["All Saints Catholic Church Parish Hall", "200 N.W. 20th St", "Fort Worth", "76164", "", 32.7811064, -97.3506026],
  ["Diamond Hill-Jarvis Library", "1300 NE 35th St", "Fort Worth", "76106", "", 32.8091627, -97.3393378],
  ["East Pointe Church of Christ", "3029 Handley Drive", "Fort Worth", "76112", "", 32.7347, -97.2173],
  ["Griffin Sub-Courthouse", "3212 Miller Ave", "Fort Worth", "76119", "", 32.7132793, -97.2629834],
  ["JPS Health Center Viola M. Pitts/Como", "4701 Byrant Irvin Road N.", "Fort Worth", "76107", "Lower Level #100", 32.7148174, -97.4116666],
  ["Longhorn Activity Center", "5350 Basswood Blvd", "Fort Worth", "76137", "", 32.87359, -97.26999],
  ["Rosemont Middle School", "1501 West Seminary Drive", "Fort Worth", "76115", "", 32.68394, -97.34116],
  ["Southside Community Center", "959 East Rosedale St", "Fort Worth", "76104", "", 32.73263, -97.31621],
  ["Southwest Community Center", "6300 Welch Ave", "Fort Worth", "76133", "", 32.65308, -97.38269],
  ["Southwest Regional Library", "4001 Library Lane", "Fort Worth", "76109", "", 32.68908, -97.39419],
  ["Southwest Sub-Courthouse", "6551 Granbury Rd", "Fort Worth", "76133", "", 32.6536129, -97.4064539],
  ["Tarrant County Elections Center", "2700 Premier St", "Fort Worth ", "76111", "", 32.8000004, -97.3062916],
  ["Tarrant County Plaza Building", "201 Burnett St", "Fort Worth", "76102", "", 32.7544742, -97.3361616],
  ["Village of Woodland Springs Amenity Bldg", "12209 Timberland Blvd", "Fort Worth", "76244", "", 32.95331, -97.29073],
  ["Worth Heights Community Center", "3551 New York Ave", "Fort Worth", "76110", "", 32.69757, -97.31605],
  ["Asia Times Square", "2615 W Pioneer Parkway", "Grand Prairie", "75051", "", 32.710272, -97.044762],
  ["The REC of Grapevine", "1175 Municipal Way", "Grapevine", "76051", "", 32.929749, -97.0767581],
  ["Haltom City Northeast Center", "3201 Friendly Lane", "Haltom City", "76117", "", 32.80866, -97.27468],
  ["Hurst Recreation Center", "700 Mary Drive", "Hurst", "76053", "", 32.820495, -97.175965],
  ["Northeast Courthouse", "645 Grapevine Highway", "Hurst", "76054", "", 32.86088, -97.17888],
  ["Keller Town Hall", "1100 Bear Creek Parkway", "Keller", "76248", "", 32.928582, -97.226184],
  ["Kennedale Community Center", "316 West 3rd St", "Kennedale", "76060", "", 32.6471383, -97.2257092],
  ["Sheriff's Office North Patrol Division", "6651 Lake Worth Boulevard", "Lake Worth", "76135", "", 32.81153, -97.43471],
  ["Mansfield Sub-Courthouse", "1100 East Broad St", "Mansfield", "76063", "", 32.56483, -97.12692],
  ["Dan Echols Center", "6801 Glenview Drive", "N Richland Hills", "76180", "", 32.823932, -97.2366457],
  ["Eagle Mountain-Saginaw ISD Admniistration", "1200 N Old Decatur Road", "Saginaw", "76179", "", 32.86117, -97.39071],
  ["Southlake Town Hall", "1400 Main Street", "Southlake", "16092", "", 32.9429, -97.1312],
  ["White Settlement Public Library", "8215 White Settlement Road", "White Settlement", "76108", "", 32.7597272, -97.4592183]
];
const numResults = 5;
let geocoder = null;
let customerMarker = null;
const markers = [];
let closest = [];

function initialize() {
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
    let pt = new google.maps.LatLng(earlyVoteLocations[i][5], earlyVoteLocations[i][6]);
    marker = new google.maps.Marker({
      position: {
        lat: earlyVoteLocations[i][5],
        lng: earlyVoteLocations[i][6]
      },
      map: map,
      animation: google.maps.Animation.DROP,
      html: earlyVoteLocations[i][0] + "<br>" + earlyVoteLocations[i][1] + "<br>" + earlyVoteLocations[i][2] + ", " + earlyVoteLocations[i][3]
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
    console.log(markers[i].getPosition().lat());
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
    icon: 'http://maps.google.com/mapfiles/kml/pushpin/grn-pushpin.png',
    html: "You Are Here"
  }));
  const closestArr = closest.splice(0, numberOfResults + 1);
  console.log(closestArr.length);
  for (i = 0; i < closestArr.length; i++) {
    console.log(closestArr[i].getPosition().lat());
    closestArr[i].setMap(map);
    bounds.extend(new google.maps.LatLng(closestArr[i].getPosition().lat(), closestArr[i].getPosition().lng()));
  }
  map.fitBounds(bounds);
  return closestArr;
}

function sortByDist(a, b) {
  return (a.distance - b.distance)
}