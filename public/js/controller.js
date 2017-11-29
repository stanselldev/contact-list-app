app.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

  var refresh = function() {
    $http({
      method: 'GET',
      url: '/contactList'
    }).then((res) => {
      $scope.contactList = res.data;
      $scope.contact = null;
    }, (e) => {
      console.log(e);
    });
  };

  refresh();

  $scope.addContact = () => {
    $http({
      method: 'POST',
      url: '/contactList',
      data: $scope.contact
    }).then((res) => {
      if (res.status === 201) {
        refresh();
      }
    }, (e) => {
      console.log(e);
    });
  };

  $scope.remove = (id) => {
    $http({
      method: 'DELETE',
      url: '/contactlist/' + id
    }).then(() => {
      setTimeout(() => {refresh()}, 200);
    }, (e) => {
      console.log(e);
    });
  };

  $scope.edit = (id) => {
    $http({
      method: 'GET',
      url: '/contactlist/' + id
    }).then((res) => {
      $scope.contact = res.data;
    }, (e) => {
      res.status(404).send(e);
    });
  };

  $scope.update = () => {
    $http({
      method: 'PUT',
      url: '/contactlist/' + $scope.contact._id,
      data: $scope.contact
    }).then(() => {

    }, (e) => {
      console.log(e);
    });
    refresh();
    console.log($scope.contact);
  };

  $scope.deselect = () => {
    $scope.contact = "";
  }

}]);
