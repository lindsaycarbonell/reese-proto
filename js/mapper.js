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



      function initialize() {
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setOptions({suppressMarkers:true});

        //image variables for map icons
        var homeImg = 'assets/home.png';
        var carImg = 'assets/car.png';
        var poolImg = 'assets/pool.png';
        var walkImg = 'assets/walk.png';
        var magnifyImg = 'assets/magnify.png';
        var icecreamImg = 'assets/icecream.png';
        //old popup box with image:
        //<div id="contentStart"><img id="logo" src="home.png"><div><b>644 Lake Hogan Lane</b><p class="inline"></p></div></div>

        //popup box content
        var homeString = '<div id="contentStart"><div><b>644 Lake Hogan Lane</b><p class="inline"></p></div></div>';
        var carString = '<div id="contentStart"><div><b>Driving around the neighborhood</b><p class="inline"></p></div></div>';
        var poolString = '<div id="contentStart"><div><b>Pool</b><p class="inline"></p></div></div>';
        var walkString = '<div id="contentStart"><div><b>Greenway</b><p class="inline"></p></div></div>';
        var lakeString = '<div id="contentStart"><div><b>Lake Hogan</b><p class="inline"></p></div></div>';
        var mapleviewString = '<div id="contentStart"><div><b>Maple View Ice Cream</b><p class="inline"></p></div></div>';

        //attach popup box content to boxes
        var homeBox= new google.maps.InfoWindow({
              content: homeString
          });
        var carBox= new google.maps.InfoWindow({
                content: carString
          });
        var poolBox= new google.maps.InfoWindow({
                content: poolString
          });
        var walkBox= new google.maps.InfoWindow({
                content: walkString
          });
        var lakeBox= new google.maps.InfoWindow({
                content: lakeString
          });
        var mapleviewBox= new google.maps.InfoWindow({
                content: mapleviewString
          });

        //basic map options
        var mapOptions = {
          center: center,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

      //basic map variable
      map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        //connect directions service to map
        directionsDisplay.setMap(map);

      //TRAFFIC
      var trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(map);

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
            // title:btn-driving
            //id:'btn-driving'
        });

        // drivingCarMarker.metadata({type: "point", id: "btn-driving"});
        // drivingCarMarker.setValues({type: "point", onClick: "changeFrame(this.id)"});

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


        //listeners to open boxes when icons are clicked
        google.maps.event.addListener(mainHouseMarker, 'click', function() {
            homeBox.open(map,mainHouseMarker);
            
        });

        google.maps.event.addListener(drivingCarMarker, 'click', function() {
            carBox.open(map,drivingCarMarker);
            changeFrame("btn-driving");
        });

        google.maps.event.addListener(poolLocationMarker, 'click', function() {
            poolBox.open(map,poolLocationMarker);
            changeFrame("btn-pool");
        });

        google.maps.event.addListener(greenWayMarker, 'click', function() {
            walkBox.open(map,greenWayMarker);
            changeFrame("btn-greenway");
        });

        google.maps.event.addListener(lakeZoomMarker, 'click', function() {
            lakeBox.open(map,lakeZoomMarker);
            changeFrame("btn-lake");
        });

        google.maps.event.addListener(mapleViewMarker, 'click', function() {
            mapleviewBox.open(map,mapleViewMarker);
            changeFrame("btn-mapleview");
        });


        //recalculate center on window resize
        function calculateCenter(){
          center = map.getCenter();
        }

        google.maps.event.addDomListener(map, 'idle', function() {
        calculateCenter();
          });
      google.maps.event.addDomListener(window, 'resize', function() {
        map.setCenter(center);
          });

      }

      //ROUTE CALCULATION
      function calcRoute(){
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

      function changeFrame(clicked_id){
        console.log("change frame");
          if(clicked_id == "btn-lake"){
            document.getElementById("main-frame").setAttribute('src','https://www.youtube.com/embed/GEIgTjmUYSI')
          }
          else if(clicked_id == "btn-driving"){
            document.getElementById("main-frame").setAttribute('src','https://www.youtube.com/embed/yyUK1DSPLWI')
          }
          else if(clicked_id == "btn-mapleview"){
            document.getElementById("main-frame").setAttribute('src','https://www.youtube.com/embed/qUS-yaib7fU')
          }
          else if(clicked_id == "btn-pool"){
            document.getElementById("main-frame").setAttribute('src','https://www.youtube.com/embed/JLEuyAlfIxg')
          }
          else if(clicked_id == "btn-greenway"){
            document.getElementById("main-frame").setAttribute('src','https://www.youtube.com/embed/4p_fimXCn2E')
          }

      }

      google.maps.event.addDomListener(window, 'load', initialize);





      var origin1 = new google.maps.LatLng(55.930385, -3.118425);
      var origin2 = "Greenwich, England";
      var destinationA = "Stockholm, Sweden";
      var destinationB = new google.maps.LatLng(50.087692, 14.421150);

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
        }

        console.log("duration: " + duration);
      }
    }