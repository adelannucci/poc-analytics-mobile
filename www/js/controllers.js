angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope) {})

.controller('LocationCtrl', function($scope, LocationService, $http) {
  //$scope.data = LocationService.getData();
  LocationService.getData().then(function(data) {
    console.log(data);
    $scope.data = data

    var config = {
        method: "POST",
        url: 'http://mongodbtst2.southcentralus.cloudapp.azure.com:8080/add',
        data: data,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    };
    var res = $http(config);

    res.success(function(data, status, headers, config) {
			console.log(status);
      console.log(data);
		});

     res.error(function(data, status, headers, config) {
			console.log(status);
      console.log(data);
		});
    
  });
});
