var app = angular.module('munkaidoApp', ['ngRoute', 'ngNotify']);

app.run(function($rootScope) {
  $rootScope.appTitle = 'Munkaidő App';
  $rootScope.backend = 'http://localhost:3000';
});

app.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/main.html'
  })
  .when('/alkalmazottak', {
    templateUrl: 'views/alkalmazottak.html',
    controller: 'alkalmazottCtrl'
  })
  .when('/munkaidok', {
    templateUrl: 'views/munkaidok.html',
    controller: 'munkaidoCtrl'
  })
  .when('/eloleg', {
    templateUrl: 'views/eloleg.html',
    controller: 'elolegCtrl'
  })
  .when('/statisztika', {
    templateUrl: 'views/statisztika.html',
    controller: 'statisztikaCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
});