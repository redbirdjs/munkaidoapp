app.controller('munkaidoCtrl', function($scope, $rootScope, ngNotify) {
  $scope.munkaidok = [];
  $scope.alkalmazottak = [];
  $scope.wh = {
    date: new Date()
  };
  $scope.enUpdate = false;

  axios.get(`${$rootScope.backend}/employees`).then(res => {
    $scope.alkalmazottak = res.data;
    $scope.$apply();
  })

  axios.get(`${$rootScope.backend}/workhours`).then(res => {
    $scope.munkaidok = res.data;
    $scope.$apply();
  });

  $scope.addWorkhour = async function() {
    axios.post(`${$rootScope.backend}/workhours`, $scope.wh).then(res => {
      if (res.data.errors) {
        ngNotify.set(res.data.errors[0], 'error');
        return;
      }
      window.location.reload();
    });
  }

  $scope.uWorkhour = async function() {
    axios.patch(`${$rootScope.backend}/workhours/${$scope.wh.id}`, $scope.wh).then(res => {
      if (res.data.errors) {
        ngNotify.set(res.data.errors[0], 'error');
        return;
      }
      window.location.reload();
    });
  }

  $scope.dWorkhour = async function() {
    axios.delete(`${$rootScope.backend}/workhours/${$scope.wh.id}`).then(res => {
      if (res.data.errors) {
        ngNotify.set(res.data.errors[0], 'error');
        return;
      }
      window.location.reload();
    });
  }

  $scope.updateWorkhour = function(wh) {
    $scope.wh.id = wh.id;
    $scope.wh.empId = wh.employee.id;
    $scope.wh.date = new Date(wh.date);
    $scope.wh.start = new Date(wh.start);
    $scope.wh.end = new Date(wh.end);
    $scope.enUpdate = true;
  }
});