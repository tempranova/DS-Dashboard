import React, { Component } from 'react';
import SummaryPanel from './SummaryPanel';

import interpolateLineRange from 'line-interpolate-points';

class Map extends Component {

  constructor(props) {
    super(props);
    this.summaryMap = this.summaryMap.bind(this);
    this.cityMap = this.cityMap.bind(this);
    this.state = {
      view : 'summary',
      cityData : false,
      currentCityData : false,
      summaryData : false,
      filter : [],
      cityInterval : false,
      summaryInterval : false,
      summaryMarkers : [],
      summaryPopups : [],
      markers : [],
      routeMarkers : [],
      routeLines : [],
      allTimeouts : []
    }
  }

  componentDidMount() {

    // Create map styles (grey and city)
    var styledMapType = new window.google.maps.StyledMapType([{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#e3e3e3"}]},{"featureType":"landscape.natural","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"color":"#e3e3e3"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.airport","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.airport","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#FFFFFF"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]}]);
    var cityStyle = new window.google.maps.StyledMapType([
       {
          "featureType":"administrative",
          "elementType":"labels.text.fill",
          "stylers":[
             {
                "color":"#445E59"
             }
          ]
       },
       {
          "featureType":"administrative",
          "elementType":"labels.text.stroke",
          "stylers":[
             {
                "color":"#000000",

             },
             {
                "weight":"0.50"
             },

          ]
       },
       {
          "featureType":"landscape.man_made",
          "elementType":"all",
          "stylers":[
             {
                "visibility":"off"
             }
          ]
       },
       {
          "featureType":"landscape.natural",
          "elementType":"geometry.fill",
          "stylers":[
             {
                "color":"#091D2A"
             }
          ]
       },
       {
          "featureType":"landscape.natural",
          "elementType":"labels.text.fill",
          "stylers":[
             {
                "color":"#7b71b5"
             }
          ]
       },
       {
          "featureType":"landscape.natural",
          "elementType":"labels.text.stroke",
          "stylers":[
             {
                "color":"#130e21"
             }
          ]
       },
       {
          "featureType":"poi",
          "elementType":"geometry.fill",
          "stylers":[
             {
                "visibility":"off"
             }
          ]
       },
       {
          "featureType":"poi",
          "elementType":"labels.text.fill",
          "stylers":[
             {
                "visibility":"off"
             }
          ]
       },
       {
          "featureType":"poi",
          "elementType":"all",
          "stylers":[
             {
                "visibility":"off"
             }
          ]
       },
       {
          "featureType":"poi.attraction",
          "elementType":"all",
          "stylers":[
             {
                "visibility":"off"
             }
          ]
       },
       {
          "featureType":"poi.business",
          "elementType":"all",
          "stylers":[
             {
                "visibility":"off"
             }
          ]
       },
       {
          "featureType":"poi.government",
          "elementType":"all",
          "stylers":[
             {
                "visibility":"off"
             }
          ]
       },
       {
          "featureType":"poi.medical",
          "elementType":"all",
          "stylers":[
             {
                "visibility":"off"
             }
          ]
       },
       {
          "featureType":"poi.park",
          "elementType":"geometry.fill",
          "stylers":[
             {
                "color":"#091D2A"
             }
          ]
       },
       {
          "featureType":"poi.park",
          "elementType":"all",
          "stylers":[
             {
                "visibility":"off"
             }
          ]
       },
       {
          "featureType":"poi.park",
          "elementType":"labels.text.stroke",
          "stylers":[
             {
                "visibility":"off"
             }
          ]
       },
       {
          "featureType":"poi.place_of_worship",
          "elementType":"all",
          "stylers":[
             {
                "visibility":"off"
             }
          ]
       },
       {
          "featureType":"poi.school",
          "elementType":"all",
          "stylers":[
             {
                "visibility":"off"
             }
          ]
       },
       {
          "featureType":"poi.sports_complex",
          "elementType":"all",
          "stylers":[
             {
                "visibility":"off"
             }
          ]
       },
       {
          "featureType":"road",
          "elementType":"geometry.fill",
          "stylers":[
             {
                "color":"#153037"
             }
          ]
       },
       {
          "featureType":"road",
          "elementType":"labels",
          "stylers":[
             {
                "visibility":"off"
             }
          ]
       },
       {
          "featureType":"road",
          "elementType":"labels.text.fill",
          "stylers":[
             {
                "visibility":"off"
             }
          ]
       },
       {
          "featureType":"road",
          "elementType":"labels.text.stroke",
          "stylers":[
             {
                "color":"#130e21"
             },
             {
                "weight":"1.00"
             },
             {
                "visibility":"off"
             }
          ]
       },{
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
               "visibility":"off"
            }
          ]
       },{
          "featureType":"road.highway",
          "elementType":"geometry.stroke",
          "stylers":[
             {
                "color":"#153037"
             }
          ]
       },
       {
          "featureType":"transit",
          "elementType":"geometry.fill",
          "stylers":[
             {
                "visibility":"off"
             }
          ]
       },
       {
          "featureType":"transit",
          "elementType":"labels.text.fill",
          "stylers":[
             {
                "visibility":"off"
             }
          ]
       },
       {
          "featureType":"transit",
          "elementType":"labels.text.stroke",
          "stylers":[
             {
                "visibility":"off"
             }
          ]
       },
       {
          "featureType":"transit.line",
          "elementType":"all",
          "stylers":[
             {
                "visibility":"off"
             }
          ]
       },
       {
          "featureType":"transit.line",
          "elementType":"labels.text.fill",
          "stylers":[
             {
                "visibility":"off"
             }
          ]
       },
       {
          "featureType":"transit.line",
          "elementType":"labels.text.stroke",
          "stylers":[
             {
                "visibility":"off"
             }
          ]
       },
       {
          "featureType":"transit",
          "elementType":"transit.station.airport",
          "stylers":[
             {
                "visibility":"off"
             }
          ]
       },
       {
          "featureType":"transit",
          "elementType":"transit.station.bus",
          "stylers":[
             {
                "visibility":"off"
             }
          ]
       },
       {
          "featureType":"transit",
          "elementType":"transit.station.rail",
          "stylers":[
             {
                "visibility":"off"
             }
          ]
       },
       {
          "featureType":"water",
          "elementType":"geometry.fill",
          "stylers":[
             {
                "color":"#070B12"
             }
          ]
       },
       {
          "featureType":"water",
          "elementType":"labels.text.fill",
          "stylers":[
             {
                "color":"#333333"
             }
          ]
       },
       {
          "featureType":"water",
          "elementType":"labels.text.stroke",
          "stylers":[
             {
                "weight":"0.75"
             }
          ]
       }
    ])


    var india = {lat: 20.7434072, lng: 77.8483247};
    var map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: india,
      zoomControlOptions: {
          position: window.google.maps.ControlPosition.LEFT_TOP
      },
      fullscreenControlOptions: {
          position: window.google.maps.ControlPosition.LEFT_TOP
      },
      mapTypeControl : false,
      // zoomControl : false,
      // gestureHandling: 'none',
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
        clearInterval(this.state.summaryInterval);
        this.setState({summaryInterval : false})
        this.setState({view: 'city'})
      } else {
        map.setMapTypeId('styled_map');
        map.data.loadGeoJson('./assets/IND.geo.json');
        clearInterval(this.state.cityInterval);
        this.setState({cityInterval : false})
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

    map.setCenter({lat: 20.7434072, lng: 77.8483247})
    map.setZoom(5);
    this.state.markers.forEach(function(marker) {
      marker.setMap(null);
    })
    this.state.routeMarkers.forEach(function(marker) {
      marker.setMap(null);
    })
    this.state.routeLines.forEach(function(line) {
      line.setMap(null);
    })
    this.state.summaryPopups.forEach(function(popup) {
      popup.style.display = 'block';
    });
    clearInterval(this.state.cityInterval);
    clearInterval(this.state.summaryInterval);

    var summaryInterval = setInterval(function() {
      runSummaryInterval(that,popups);
    },1000);
    runSummaryInterval(this,popups);

    this.setState({
      summaryInterval : summaryInterval,
      currentCityData : false
    });

    function runSummaryInterval(that) {
      if(that.state.view==='summary') {
        fetch('/fake_call/api_call.json', {
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
                  // console.log(that.state.summaryPopups)
                  if(that.state.summaryPopups.length===0) {
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
                  }
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
              summaryData : json,
              summaryPopups : popups.length>0 ? popups : that.state.summaryPopups
            });

          }).catch(error => { console.log(error); });
      }
    }
  }

  cityMap(city, map) {
    // Perform API call specific to this city repeatedly
    var that = this;
    var markers = [];
    var markerIDs = [];
    var popups = [];
    var intervals = [];
    var ts = [];
    var routeLines = [];
    var routeMarkers = [];
    var count = 0;

    // End any old calls
    this.state.summaryPopups.forEach(function(popup) {
      popup.style.display = 'none';
    });
    this.state.markers.forEach(function(marker) {
      marker.setMap(null);
    })
    this.state.routeMarkers.forEach(function(marker) {
      marker.setMap(null);
    })
    this.state.routeLines.forEach(function(line) {
      line.setMap(null);
    })
    clearInterval(this.state.cityInterval);
    clearInterval(this.state.summaryInterval);

    this.setState({
      cityInterval : currentCityInterval,
      cityData : city,
      markers : [],
      routeLines : [],
      routeMarkers : []
    });


    var currentCityInterval = setInterval(function() {
      runCityInterval(that);
    },5000);
    runCityInterval(this);


    function runCityInterval(that) {
      if(that.state.view==='city') {
        // This call can be changed depending on the city clicked or
        // depending on the geographic area
        fetch('/fake_call/city.json',{
          method: 'GET',
        })
        .then(response => response.json())
        .then(json => {

            that.setState({currentCityData : json});

            // console.log(intervals)
            intervals.forEach(function(interval) {
              clearInterval(interval);
            })
            intervals = [];
            ts = [];

            var allCabIds = [];
            json.data.forEach(function(element,index,array) {
                allCabIds.push(element.cab_id);

                if(markerIDs.indexOf(element.cab_id)===-1) {

                  // any filters on, exclude new drivers from being added
                  // console.log('running');
                  var size = element.cab_trip_status==='started' ? 20 : 10;
                  var image = {
                    url: '/assets/'+element.delay_status.replace(' ','_')+'_'+element.cab_trip_status+'.png',
                    size: new window.google.maps.Size(size,size),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(size/2,size/2)
                  };
                  if(element.route_deviation) {
                    image.url = '/assets/route_deviation_'+element.cab_trip_status+'.png'
                  }
                  var marker = new window.google.maps.Marker({
                    position: {lat:element.location[0],lng:element.location[1]},
                    map: map,
                    icon: image,
                    id : element.cab_id,
                    cab_trip_status : element.cab_trip_status,
                    route_deviation : element.route_deviation,
                    delay_status : element.delay_status
                  });
                  // Setting up routing to destination
                  // Here, would pass start and finish coords
                  marker.addListener('click', function() {
                    fetch('/fake_call/route.json',{
                      method: 'GET',
                    })
                    .then(response => response.json())
                    .then(json => {
                      routeLines.forEach(function(routeLine) {
                        routeLine.setMap(null);
                      })
                      routeLines = [];
                      routeMarkers.forEach(function(routeMarker) {
                        routeMarker.setMap(null);
                      })
                      routeMarkers = [];

                      var waypoints = [];
                      var numberOfTimes = Math.ceil(json[0].route.length/23);
                      for(var i=0;i<numberOfTimes;i++) {
                        var start = i>0 ? (23*i)-1 : 23*i;
                        var slicedRoute = json[0].route.slice(start,23*(i+1));
                        waypoints.push(slicedRoute)
                      }
                      // Directions call with all waypoints
                      var legs = [];
                      var delay = 0;
                      waypoints.forEach(function(route,topIndex) {
                        // Timeout to ensure they return in the right order
                        var pointsBetween = route.slice(1,-1);
                        var waypoints = pointsBetween.map(point => {
                          return {
                            location : new window.google.maps.LatLng(point[0],point[1])
                          };
                        })
                        let directionsService = new window.google.maps.DirectionsService();
                        let directionsDisplay = new window.google.maps.DirectionsRenderer({
                            map: map
                        });
                        let request = {
                            origin      : new window.google.maps.LatLng(route[0][0],route[0][1]),
                            destination : new window.google.maps.LatLng(route[route.length-1][0],route[route.length-1][1]),
                            waypoints : waypoints,
                            travelMode  : 'DRIVING'
                        };
                        directionsService.route(request, function(response, status) {
                          if ( status == window.google.maps.DirectionsStatus.OK ) {
                            if(topIndex===0) {
                              legs = response.routes[0].legs;
                              var bigTimeout = setTimeout(function() {
                                for(var k=0;k<legs.length;k++) {
                                  delay += 1;
                                  legs[k].steps.forEach(function(step,stepIndex) {
                                    delay += 1;
                                    var anotherTimeout = setTimeout(function() {
                                      var coords = step.path;
                                      if(stepIndex===0) {
                                        // Black circles
                                        var marker = new window.google.maps.Marker({
                                          position: {
                                            lat : step.path[0].lat(), lng : step.path[0].lng(),
                                          },
                                          map: map,
                                          icon: {
                                             path: window.google.maps.SymbolPath.CIRCLE,
                                             scale: map.getZoom()/10,
                                             fillOpacity: 1,
                                             strokeColor : '#FFFFFF',
                                             fillColor: '#FFFFFF'
                                          }
                                        });
                                        marker.setMap(map);
                                        routeMarkers.push(marker);
                                      }
                                      if(stepIndex===legs[k-1].steps.length-1) {
                                        // White circles
                                        var marker = new window.google.maps.Marker({
                                          position: {
                                            lat : step.path[step.path.length-1].lat(), lng : step.path[step.path.length-1].lng(),
                                          },
                                          map: map,
                                          icon: {
                                             path: window.google.maps.SymbolPath.CIRCLE,
                                             scale: map.getZoom()/8,
                                             fillOpacity: 0.5,
                                             strokeColor : '#FFFFFF',
                                             fillColor: '#FFFFFF'
                                          }
                                        });
                                        marker.setMap(map);
                                        routeMarkers.push(marker);
                                      }
                                      // Make polyline
                                      var polyline = new window.google.maps.Polyline({
                                        path : coords,
                                        strokeColor : '#72E18B',
                                        strokeOpacity: 0,
                                        strokeWeight: 3
                                      });
                                      polyline.setMap(map);
                                      routeLines.push(polyline);
                                      // fade line in
                                      var opacityCount = 0;
                                      var newInterval = setInterval(function() {
                                        opacityCount += 0.2;
                                        if(opacityCount===1) {
                                          opacityCount = 0;
                                          clearInterval(newInterval);
                                        } else {
                                          polyline.setOptions({strokeOpacity: opacityCount})
                                        }
                                      },20);
                                      that.setState({
                                        routeLines : routeLines,
                                        routeMarkers : routeMarkers
                                      })
                                    },50*(delay*(topIndex+1)));
                                    var allTimeouts = JSON.parse(JSON.stringify(that.state.allTimeouts));
                                    allTimeouts.push(anotherTimeout);
                                    that.setState({allTimeouts})
                                  });
                                }
                              },250);
                              var allTimeouts = JSON.parse(JSON.stringify(that.state.allTimeouts));
                              allTimeouts.push(bigTimeout);
                              that.setState({allTimeouts})
                            } else {
                              setTimeout(function() {
                                legs = legs.concat(response.routes[0].legs);
                              },1000);
                            }
                          } else {
                            console.log('Error! Something happened: ', status, response);
                          }
                        });
                      });
                    });
                  });

                  // console.log('setmakers')
                  markers.push(marker);
                  markerIDs.push(element.cab_id);
                  that.setState({
                    markers: markers
                  });
                } else {

                  // Here, random element being added to location
                  // Remove when using real data
                  var range = interpolateLineRange( [
                    [that.state.markers[index].getPosition().lat(),that.state.markers[index].getPosition().lng()],
                    [element.location[0]+(Math.random()/5),element.location[1]+(Math.random()/5)]
                  ], 51 );

                  // Short interval to animate
                  var t = 0;
                  var thisInterval = setInterval(function() {
                    // clearInterval(thisInterval);
                      // if(index<3) {
                      if(t<50&&typeof range[t] !== 'undefined') {
                        markers[index].setPosition({lat:range[t][0],lng:range[t][1]})
                        t = 1+t;
                      } else {
                        clearInterval(thisInterval);
                      }
                      // }
                  }, 100);
                  intervals.push(thisInterval);
                  // setTimeout(function() {
                  //   clearInterval(thisInterval);
                  // },5000);

                  // Modify who is shown and hidden

                }
            });

            // Removing any cabs not in the data
            markers.forEach(function(marker) {
              if(allCabIds.indexOf(marker.id)===-1) {
                var indexOf = markerIDs.indexOf(marker.id);
                markers = markers.splice(indexOf,1);
                markerIDs = markerIDs.splice(indexOf,1);
                marker.setMap(null);
              }
            });

            count += 1;

          }).catch(error => { console.log(error); });
      }
    }
  }

  setSummaryView() {
    const { map, markers, routeMarkers, routeLines } = this.state;
    this.setState({
      view: 'summary'
    })
    this.summaryMap(map);
    this.setState({filter:[]});
  }

  changeCity(e) {
    const { map, markers, routeMarkers, routeLines, cityInterval, summaryData } = this.state;
    map.setMapTypeId('city_map');
    map.data.forEach(function (feature) {
      map.data.remove(feature);
    });

    // Set new city
    summaryData.forEach(function(city) {
      if(city.city===e.target.value) {
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
        map.fitBounds(bounds);
      }
    }.bind(this))
    this.cityMap(e.target.value, map);
    this.setState({filter:[]});
  }

  selectFilter(type,passedFilter) {
    const { filter, markers, map, allTimeouts } = this.state;
    if(this.state.view==='city') {
      if(filter.length===0||filter[1]!==passedFilter.replace(' ','_').toLowerCase()) {
        this.state.routeMarkers.forEach(function(marker) {
          marker.setMap(null);
        })
        this.state.routeLines.forEach(function(line) {
          line.setMap(null);
        })
        allTimeouts.forEach(function(timeout) {
          clearTimeout(timeout);
        })

        type = type.indexOf('starting')>-1 ? 'accepted' : 'started';
        var newFilter = [type,passedFilter.replace(' ','_').toLowerCase()];
        // Removing any cabs not in the data
        markers.forEach(function(marker) {
          if(newFilter.length>0&&(newFilter[0]===marker.cab_trip_status&&(newFilter[1]===marker.delay_status||(newFilter[1]==='route_deviation'&&marker.route_deviation)))) {
            marker.setMap(map);
          } else {
            marker.setMap(null);
          }
        });
        this.setState({filter:newFilter});
      } else {
        markers.forEach(function(marker) {
          marker.setMap(map);
        });
        this.setState({filter:[]});
      }


    }
  }

  render() {
    const { view, currentCityData, cityData, summaryData, filter } = this.state;

    let currentData = view === 'summary' ? summaryData : currentCityData;

    let totalTrips = 0;
    let highDelayTrips = 0;
    let lowDelayTrips = 0;
    let onTimeTrips = 0;
    let routeDeviation = 0;
    let startedOnTimeTrips = 0;
    let runningLate = 0;
    let startedTripTotal = 0;

    if(summaryData&&view==='summary') {
      totalTrips = currentData
        .reduce((prev, curr) => prev + curr.stats.starting_trips.total, 0)
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


    } else if(currentCityData&&view==='city') {
        totalTrips = currentData.stats.accepted_trips.total;
        highDelayTrips = currentData.stats.accepted_trips.high_delay;
        lowDelayTrips = currentData.stats.accepted_trips.low_delay;
        onTimeTrips = currentData.stats.accepted_trips.on_time;
        routeDeviation = currentData.stats.started_trips.route_deviation;
        startedOnTimeTrips = currentData.stats.started_trips.on_time;
        runningLate = currentData.stats.started_trips.running_late;
        startedTripTotal = currentData.stats.started_trips.total;
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
        {this.state.view==='city' ?
          <div className="menu">
            <ul className="first-menu">
              <li onClick={this.setSummaryView.bind(this)}><u style={{marginTop:'10px'}}>{"<"} Map Summary</u></li>
              <li>
                <img className="marker-img" src="assets/marker.png" />
                <select onChange={this.changeCity.bind(this)}>
                  <option value={cityData}>{cityData}</option>
                  {summaryData.map(function(city) {
                    if(cityData!==city.city) {
                      return (
                        <option key={city.city} value={city.city}>{city.city}</option>
                      )
                    }
                  })}
                </select>
              </li>
              <li><img className="menu-img" src="assets/menu.png" /></li>
            </ul>
          </div>
        : false }
        <div className="overlay">
          <div className={"left-panel "+view}>
            <SummaryPanel selectFilter={this.selectFilter.bind(this)} filter={filter}
              data={startingTrips} />
          </div>
          <div className={"right-panel "+view}>
            <SummaryPanel selectFilter={this.selectFilter.bind(this)} filter={filter}
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
