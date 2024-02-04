app.controller('naptarCtrl', function($scope, $rootScope, ngNotify) {
  $scope.events = [];

  axios.get(`${$rootScope.backend}/calendarstats`).then(res => {
    const results = res.data;
    const workhours = results.workhours.map((wh) => {
      console.log( { title: `${wh.name} - Munkaidő`, start: `${wh.date.split('T')[0]}T${wh.start.split('T')[1]}` });
      let shrs = wh.start.split('T')[1].split(':')[0];
      let smins = wh.start.split('T')[1].split(':')[1];
      let ehrs = wh.end.split('T')[1].split(':')[0];
      let emins = wh.end.split('T')[1].split(':')[1];
      return { title: `${wh.name} - Munkaidő ${shrs}:${smins}-${ehrs}:${emins}`, start: `${wh.date.split('T')[0]}T${wh.start.split('T')[1]}`, end: `${wh.date.split('T')[0]}T${wh.end.split('T')[1]}`, backgroundColor: '#ff0000' }
    });
    const prepayments = results.prepayments.map((result) => {
      return { title: `${result.name} | Előleg - HUF ${result.amount}`, start: result.date.split('T')[0], backgroundColor: '#ffbb00', textColor: '#000000' }
    });

    $scope.events = [...prepayments, ...workhours];
    console.log($scope.events);

    $scope.$apply();
    const calendarElement = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarElement, {
      initialView: 'dayGridMonth',
      height: '80vh',
      locale: 'hu',
      firstDay: 1,
      events: $scope.events
    });
    calendar.render();
  });
});