app.controller('elolegCtrl', function($scope, $rootScope, ngNotify) {
  $scope.alkalmazottak = [{
    id: 0,
    name: "Válassz egy alkalmazottat",
    amount: 0
  }];
  $scope.pp = {
    id: 0,
    employee: 0,
    date: new Date(),
    amount: 0
  }

  $scope.elolegek = [];
  $scope.enUpdate = false;

  axios.get(`${$rootScope.backend}/employees`).then(res => {
    $scope.alkalmazottak = $scope.alkalmazottak.concat(res.data);
    $scope.pp.employee = $scope.alkalmazottak[0];
    $scope.$apply();
  });

  axios.get(`${$rootScope.backend}/prepayments`).then(res => {
    $scope.elolegek = res.data;
    $scope.$apply();
  });

  $scope.addPrepayment = async function() {
    axios.post(`${$rootScope.backend}/prepayments`, $scope.pp).then(res => {
      if (res.data.errors) {
        ngNotify.set(res.data.errors[0], 'error');
        return;
      }
      window.location.reload();
    });
  }

  $scope.uPrepayment = async function() {
    axios.patch(`${$rootScope.backend}/prepayments/${$scope.pp.id}`, $scope.pp).then(res => {
      if (res.data.errors) {
        ngNotify.set(res.data.errors[0], 'error');
        return;
      }
      window.location.reload();
    });
  }

  $scope.dPrepayment = async function() {
    axios.delete(`${$rootScope.backend}/prepayments/${$scope.pp.id}`).then(res => {
      if (res.data.errors) {
        ngNotify.set(res.data.errors[0], 'error');
        return;
      }
      window.location.reload();
    });
  }

  $scope.updatePrepayment = function(pp) {
    $scope.pp.id = pp.id;
    $scope.pp.employee = pp.employee;
    $scope.pp.date = new Date(pp.date);
    $scope.pp.amount = pp.amount;
    $scope.enUpdate = true;
  }
});