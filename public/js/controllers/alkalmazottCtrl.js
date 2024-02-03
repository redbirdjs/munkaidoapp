app.controller('alkalmazottCtrl', function($scope, $rootScope) {
  $scope.alkalmazottak = [];
  $scope.ne = {};
  $scope.enUpdate = false;

  axios.get(`${$rootScope.backend}/employees`).then(res => {
    $scope.alkalmazottak = res.data;
    $scope.$apply();
  });

  $scope.addEmployee = function() {
    axios.post(`${$rootScope.backend}/employees`, $scope.ne).then(res => {
      window.location.reload();
    });
  }

  $scope.updateEmployee = function(edata) {
    $scope.ne.id = edata.id;
    $scope.ne.name = edata.name;
    $scope.ne.address = edata.address;
    $scope.ne.position = edata.position;
    $scope.ne.priceperhour = edata.pricePerHour;
    $scope.enUpdate = true;
  }

  $scope.uEmployee = function() {
    axios.patch(`${$rootScope.backend}/employees/` + $scope.ne.id, $scope.ne).then(res => {
      window.location.reload();
    });
  }

  $scope.dEmployee = function() {
    axios.delete(`${$rootScope.backend}/employees/` + $scope.ne.id).then(res => {
      window.location.reload();
    });
  }
});