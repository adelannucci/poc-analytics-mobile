angular.module('starter.services', ['ngCordova'])
       .factory('LocationService', LocationService);

//LocationService.$inject = [$cordovaDevice];
function LocationService ($cordovaDevice, $cordovaGeolocation, $q) {
  var service = {
      getData: getData
  };

  return service;

  function getData() {
      var d = $q.defer();
      var date = new Date();
      console.log(date);

      var data = {
          time: date.getTime(),
          lat: 0,
          lng: 0,
          so: "",
          version: "",
          model: "",
          macaddress: "",
          connections: 0,
          logTime: date.getTime()
      };

    var posOptions = { 
        timeout: 20000, 
        enableHighAccuracy: true
    };
    
    $cordovaGeolocation.getCurrentPosition(posOptions)
        .then(function(position){
            if('cordova' in window){
                data.lat = position.coords.latitude;
                data.lng = position.coords.longitude;
                data.so = $cordovaDevice.getPlatform();
                data.version = $cordovaDevice.getVersion();
                data.model = $cordovaDevice.getModel();
                data.macaddress = $cordovaDevice.getUUID();
                data.connections = 1;
            } else {
                data.lat = position.coords.longitude;
                data.lng = position.coords.longitude;
                data.so = "iOS";
                data.version = "10";
                data.model = "iPhone 7";
                data.macaddress = "00:00:00:00:42";
                data.connections = 1;
            }
            console.log(data);
            d.resolve(data); 
        }, function(error){
            console.log('error:', error);
            promise.error(error);
        });

        return d.promise;
  }
};
