app.controller('statisztikaCtrl', function($scope, $rootScope, ngNotify) {
  $scope.statisztika = [];
  $scope.months = [];
  $scope.month = {
    id: 0,
    name: ''
  };

  for (let i = 1; i < 13; i++) {
    let date = new Date(`2020-${i}-01`).toLocaleString('hu-HU', { month: 'long' });
    $scope.months.push({
      id: i,
      name: date
    });
  }
  $scope.month = $scope.months[0];

  axios.get(`${$rootScope.backend}/statistics/${$scope.month.id}`).then(res => {
    $scope.statisztika = res.data;
    $scope.$apply();
  });

  $scope.changeStats = () => {
    axios.get(`${$rootScope.backend}/statistics/${$scope.month.id}`).then(res => {
      $scope.statisztika = res.data;
      $scope.$apply();
    });
  }
});