      //for directions
      var directionsDisplay;
      var directionsService = new google.maps.DirectionsService();
      var mainHouse = new google.maps.LatLng(35.945661, -79.092977);
      var drivingCar = new google.maps.LatLng(35.94711151, -79.09687157);
      var poolLocation = new google.maps.LatLng(35.95016604, -79.09699202);
      var greenWay = new google.maps.LatLng(35.94998603, -79.10061568);
      var lakeZoom = new google.maps.LatLng(35.94880686,-79.10214186);
      var mapleView = new google.maps.LatLng(35.976848,-79.138885);
      var map;
      var center = new google.maps.LatLng(35.9475642,-79.09864723);

      var start;
      var end = mainHouse;

      var geocoder;


      //basic map options
      var mapOptions = {
        center: center,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      //basic map variable
      map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

      //TRAFFIC
      var trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(map);

      //image variables for map icons
      var homeImg = 'assets/home.png';
      var carImg = 'assets/car.png';
      var poolImg = 'assets/pool.png';
      var walkImg = 'assets/walk.png';
      var magnifyImg = 'assets/magnify.png';
      var icecreamImg = 'assets/icecream.png';
      //old popup box with image:
      //<div id="contentStart"><img id="logo" src="home.png"><div><b>644 Lake Hogan Lane</b><p class="inline"></p></div></div>

      //marker variables with attached icons
      var mainHouseMarker = new google.maps.Marker({
          position: mainHouse,
          map: map,
          icon: homeImg
      });

      var drivingCarMarker = new google.maps.Marker({
          position: drivingCar,
          map: map,
          icon: carImg
      });

      var poolLocationMarker = new google.maps.Marker({
          position: poolLocation,
          map: map,
          icon: poolImg
      });

      var greenWayMarker = new google.maps.Marker({
          position: greenWay,
          map: map,
          icon: walkImg
      });

      var lakeZoomMarker = new google.maps.Marker({
          position: lakeZoom,
          map: map,
          icon: magnifyImg
      });

      var mapleViewMarker = new google.maps.Marker({
          position: mapleView,
          map: map,
          icon: icecreamImg
      });


      //MAIN POPUP
      var bigBox = new google.maps.InfoWindow({
        content: "Empty"
      });



      function initialize() {
        geocoder = new google.maps.Geocoder();
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setOptions({suppressMarkers:true});

        //connect directions service to map
        directionsDisplay.setMap(map);

        //popup box content
        var homeString = '<div id="contentStart"><div><b>644 Lake Hogan Lane</b><p class="inline"></p></div></div>';
        var carString = '<div id="contentStart"><div><b>Driving around the neighborhood</b><p class="inline"></p></div></div>';
        var poolString = '<div id="contentStart"><div><b>Pool</b><p class="inline"></p></div></div>';
        var walkString = '<div id="contentStart"><div><b>Greenway</b><p class="inline"></p></div></div>';
        var lakeString = '<div id="contentStart"><div><b>Lake Hogan</b><p class="inline"></p></div></div>';
        var mapleviewString = '<div id="contentStart"><div><b>Maple View Ice Cream</b><p class="inline"></p></div></div>';

        //listeners to open boxes when icons are clicked
        google.maps.event.addListener(mainHouseMarker, 'click', function() {
            bigBox.setContent(homeString);
            bigBox.open(map,mainHouseMarker);
            changeFrame("btn-house");
            //changeFrame()...
        });

        google.maps.event.addListener(drivingCarMarker, 'click', function() {
            bigBox.setContent(carString);
            bigBox.open(map,drivingCarMarker);
            changeFrame("btn-driving");
        });

        google.maps.event.addListener(poolLocationMarker, 'click', function() {
            bigBox.setContent(poolString);
            bigBox.open(map,poolLocationMarker);
            changeFrame("btn-pool");
        });

        google.maps.event.addListener(greenWayMarker, 'click', function() {
            bigBox.setContent(walkString);
            bigBox.open(map,greenWayMarker);
            changeFrame("btn-greenway");
        });

        google.maps.event.addListener(lakeZoomMarker, 'click', function() {
            bigBox.setContent(lakeString);
            bigBox.open(map,lakeZoomMarker);
            changeFrame("btn-lake");
        });

        google.maps.event.addListener(mapleViewMarker, 'click', function() {
            bigBox.setContent(mapleviewString);
            bigBox.open(map,mapleViewMarker);
            changeFrame("btn-mapleview");
        });


        //recalculate center on window resize
        function calculateCenter(){
          center = map.getCenter();
        }

        $('#recenter').click(function(){
          map.setCenter(center);
          map.setZoom(15);
        });

        google.maps.event.addDomListener(map, 'idle', function() {
        calculateCenter();
          });
      google.maps.event.addDomListener(window, 'resize', function() {
        map.setCenter(center);
          });

      }



      //GEOCODER
      function codeAddress(){
        var address = document.getElementById('address').value;
        if (address=="add a location"){
          alert('Please enter an address');
        }
        geocoder.geocode({'address': address}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
          } else {
            alert('Please add an address');
          }
              });
        }

      //ROUTE CALCULATION
      function calcRoute(){
        bigBox.close();
        start = document.getElementById('start').value;
        var request = {
          origin:start,
          destination:end,
          travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function(response, status){
          if (status == google.maps.DirectionsStatus.OK){
            directionsDisplay.setDirections(response);
          }

        //GET DISTANCE BETWEEN PLACES
        service.getDistanceMatrix(
            {
              origins: [start],
              destinations: [end],
              travelMode: google.maps.TravelMode.DRIVING,
              unitSystem: google.maps.UnitSystem.IMPERIAL,
              durationInTraffic: true,
              avoidHighways: false,
              avoidTolls: false,
            }, callback);
        });
      };

      google.maps.event.addDomListener(window, 'load', initialize);

      //MORE GET DISTANCE STUFF

      var service = new google.maps.DistanceMatrixService();

      function callback(response, status) {
        if (status == google.maps.DistanceMatrixStatus.OK) {
          var origins = response.originAddresses;
          var destinations = response.destinationAddresses;

        for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
        for (var j = 0; j < results.length; j++) {
            var element = results[j];
            var distance = element.distance.text;
            var duration = element.duration.text;
            var from = origins[i];
            var to = destinations[j];
          }
          addPopDirections();
        }

        function addPopDirections(){
          // console.log("Pop directions!" + duration + end);
          console.log(start);
          console.log(end);
          start = document.getElementById('start').value;
          var directBox = new google.maps.InfoWindow({
            content: "duration: " + duration + "<br>" + "distance: " + distance,
            position: end
          });
          directBox.open(map,mapleViewMarker);
        }


        // console.log("duration: " + duration);
        // console.log("distance: " + distance);


      }
    }
