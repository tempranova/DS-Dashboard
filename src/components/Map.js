import React, { Component } from 'react';

class SummaryPanel extends Component {
  render() {
    const {
      totalTrips, 
      widgetLeftName,
      widgetLeftData,
      widgetMiddleName,
      widgetMiddleData, 
      widgetRightName,
      widgetRightData,
      panelDescription 
    } = this.props.data;

    return (
      <div>
      <p className="panelText">
        {panelDescription}
      </p>
      <div className="left">
        <p className="totalTrips">
          {totalTrips}
        </p>
          <br/>Trips
      </div>
      <div className="right">
        <div className={["widget", "red"].join(' ')}>
          {widgetLeftName} ({widgetLeftData})
        </div>
        <div className={["widget", "yellow"].join(' ')}>
          {widgetMiddleName} ({widgetMiddleData})
        </div>
        <div className={["widget", "green"].join(' ')}>
        { widgetRightName}<br/>({widgetRightData})
        </div>
      </div>
      </div>
    );
  }
}

class Map extends Component {

  constructor(props) {
    super(props);
    this.summaryMap = this.summaryMap.bind(this);
    this.cityMap = this.cityMap.bind(this);
    this.state = {
      view : 'summary',
      cityData : false,
      summaryData : false
    }
  }

  componentDidMount() {

    // Create map styles (grey and city)
    var styledMapType = new window.google.maps.StyledMapType([{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#e3e3e3"}]},{"featureType":"landscape.natural","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"color":"#e3e3e3"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.airport","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.airport","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#FFFFFF"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]}]);
    var cityStyle = new window.google.maps.StyledMapType([{"featureType":"all","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"},{"saturation":"-100"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40},{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"landscape","elementType":"geometry.stroke","stylers":[{"color":"#4d6059"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"lightness":21}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"poi","elementType":"geometry.stroke","stylers":[{"color":"#4d6059"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#7f8d89"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#2b3638"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2b3638"},{"lightness":17}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#24282b"}]},{"featureType":"water","elementType":"geometry.stroke","stylers":[{"color":"#24282b"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.icon","stylers":[{"visibility":"off"}]}]);


    var india = {lat: 20.7434072, lng: 77.8483247};
    var map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: india,
      mapTypeControl : false,
      zoomControl : false,
      gestureHandling: 'none',
      streetViewControl : false
    });
    this.setState({map});

    // Set up initial styling and events
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
    map.mapTypes.set('city_map', cityStyle);

    map.addListener('zoom_changed',function() {
      // console.log(map.getZoom())
      if(map.getZoom()>6) {
        map.setMapTypeId('city_map');
        map.data.forEach(function (feature) {
          map.data.remove(feature);
        });
        this.setState({view: 'city'})
      } else {
        map.setMapTypeId('styled_map');
        map.data.loadGeoJson('./assets/IND.geo.json');
        this.setState({view: 'summary'})
      }
    }.bind(this));

    map.data.loadGeoJson('./assets/IND.geo.json');
    map.data.setStyle({
      fillColor : '#3B444E',
      fillOpacity: 1,
      strokeWeight: 3,
      strokeColor : '#B3D213'
    })

    this.summaryMap(map);

  }

  summaryMap(map) {

    this.createPopup();

    // Cities
    var that = this;
    var markers = [];
    var popups = [];
    var count = 0;
    setInterval(function() {
      fetch('/fake_call/api_call.json',{
        method: 'GET',
      })
      .then(response => response.json())
      .then(json => {

          // Initial setup
          if(count===0) {
            count += 1;
            json.forEach(function(city,index) {
                var bounds = new window.google.maps.LatLngBounds();
                var latLngArray = city.polygon.map(coords => {
                  var latLng = { lat: coords[0], lng: coords[1] };
                  bounds.extend(latLng);
                  return latLng;
                });
                var thisCityPoly = new window.google.maps.Polygon({
                  paths : latLngArray
                })
                var center = bounds.getCenter();
                // Should be custom small green dot marker
                var marker = new window.google.maps.Marker({
                  position: center,
                  map: map,
                  icon: {
                     path: window.google.maps.SymbolPath.CIRCLE,
                     scale: 2,
                     fillOpacity: 1,
                     strokeWeight: 2,
                     fillColor: '#71E48D',
                     strokeColor: '#71E48D'
                  }
                });
                markers.push(marker);
                // Popup with custom display
                var newPopup = document.createElement('div');
                newPopup.className = 'custom-popup '+city.city;
                newPopup.innerHTML = '<div>'+
                  '<div class="circle-letter">'+city.city.charAt(0)+'</div>'+
                  '<div class="list-trips">'+
                    '<ul><li>Orders: '+city.orders+'</li>'+
                    '<li>Trips: '+city.trips+'</li></ul>'+
                  '</div></div>';
                newPopup.onclick = function(event) {
                  map.fitBounds(bounds);
                  that.cityMap(city.city,map);
                };
                var popup = new this.Popup(center, newPopup);
                popup.setMap(map);
                popups.push(newPopup);
            }.bind(that));
          } else {
            // Register changes
            json.forEach(function(city,index) {
              popups[index].innerHTML = '<div>'+
                '<div class="circle-letter">'+city.city.charAt(0)+'</div>'+
                '<div class="list-trips">'+
                  '<ul><li>Orders: '+city.orders+'</li>'+
                  '<li>Trips: '+city.trips+'</li></ul>'+
                '</div></div>';
            });
          }
          that.setState({
            summaryData : json
          });

        }).catch(error => { console.log(error); });
    },1000);
  }

  cityMap(city, map) {
    // Perform API call specific to this city repeatedly
  }

  render() {
    const { view, cityData, summaryData } = this.state;

    let currentData = view === 'summary' ? summaryData : cityData;

    let totalTrips = 0;
    let highDelayTrips = 0;
    let lowDelayTrips = 0;
    let onTimeTrips = 0;
    let routeDeviation = 0;
    let startedOnTimeTrips = 0;
    let runningLate = 0;
    let startedTripTotal = 0;

    if(summaryData) {
      totalTrips = currentData
        .reduce((prev, curr) => prev + curr.trips, 0)
        .toLocaleString('en');
      highDelayTrips = currentData
        .reduce((prev, curr) => prev + curr.stats.starting_trips.high_delay, 0)
        .toLocaleString('en');
      lowDelayTrips = currentData
        .reduce((prev, curr) => prev + curr.stats.starting_trips.low_delay, 0)
        .toLocaleString('en');
      onTimeTrips = currentData
        .reduce((prev, curr) => prev + curr.stats.starting_trips.on_time, 0)
        .toLocaleString('en');

      startedTripTotal = currentData
        .reduce((prev, curr) => prev + curr.stats.started_trips.total, 0)
        .toLocaleString('en');
      routeDeviation = currentData
        .reduce((prev, curr) => prev + curr.stats.started_trips.route_deviation, 0)
        .toLocaleString('en');
      runningLate = currentData
        .reduce((prev, curr) => prev + curr.stats.started_trips.running_late, 0)
        .toLocaleString('en');
      startedOnTimeTrips = currentData
        .reduce((prev, curr) => prev + curr.stats.started_trips.on_time, 0)
        .toLocaleString('en');


    } else if(cityData) {

    }

    let startingTrips = {
      totalTrips, 
      widgetLeftName : 'High Delay',
      widgetLeftData : highDelayTrips, 
      widgetMiddleName : 'Low Delay',
      widgetMiddleData : lowDelayTrips,
      widgetRightName : 'On Time',
      widgetRightData : onTimeTrips,
      panelDescription : 'Trips starting in 30 minutes'
    };

    let startedTrips = {
      totalTrips: startedTripTotal, 
      widgetLeftName : 'Route Deviation',
      widgetLeftData : routeDeviation, 
      widgetMiddleName : 'Running Late',
      widgetMiddleData : runningLate,
      widgetRightName : 'On Time',
      widgetRightData : startedOnTimeTrips,
      panelDescription : 'Run time trips'
    };
    
    return (
      <div>
        <div className="overlay">
        <div className="left-panel">
          <SummaryPanel
            data={startingTrips} />
        </div>
        <div className="right-panel">
          <SummaryPanel
            data={startedTrips} />
        </div>
        </div>
        <div style={{height:window.innerHeight}} id="map" className="main-map"></div>
      </div>
    );
  }

  createPopup() {
    this.Popup = function(position, content) {
      this.position = position;

      content.classList.add('popup-bubble-content');

      var pixelOffset = document.createElement('div');
      pixelOffset.classList.add('popup-bubble-anchor');
      pixelOffset.appendChild(content);

      this.anchor = document.createElement('div');
      this.anchor.classList.add('popup-tip-anchor');
      this.anchor.appendChild(pixelOffset);

      // Optionally stop clicks, etc., from bubbling up to the map.
      this.stopEventPropagation();
    };
    // NOTE: google.maps.OverlayView is only defined once the Maps API has
    // loaded. That is why Popup is defined inside initMap().
    this.Popup.prototype = Object.create(window.google.maps.OverlayView.prototype);

    /** Called when the popup is added to the map. */
    this.Popup.prototype.onAdd = function() {
      this.getPanes().floatPane.appendChild(this.anchor);
    };

    /** Called when the popup is removed from the map. */
    this.Popup.prototype.onRemove = function() {
      if (this.anchor.parentElement) {
        this.anchor.parentElement.removeChild(this.anchor);
      }
    };

    /** Called when the popup needs to draw itself. */
    this.Popup.prototype.draw = function() {
      var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
      // Hide the popup when it is far out of view.
      var display =
          Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
          'block' :
          'none';

      if (display === 'block') {
        this.anchor.style.left = divPosition.x + 'px';
        this.anchor.style.top = divPosition.y + 'px';
      }
      if (this.anchor.style.display !== display) {
        this.anchor.style.display = display;
      }
    };

    /** Stops clicks/drags from bubbling up to the map. */
    this.Popup.prototype.stopEventPropagation = function() {
      var anchor = this.anchor;
      anchor.style.cursor = 'auto';

      ['click', 'dblclick', 'contextmenu', 'wheel', 'mousedown', 'touchstart',
       'pointerdown']
          .forEach(function(event) {
            anchor.addEventListener(event, function(e) {
              e.stopPropagation();
            });
          });
    };
  }
}

export default Map;
