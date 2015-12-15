(function() {
  'use strict';

  angular.module('app.services')
    .factory('userAPI', userAPI);

  userAPI.$inject = ['Restangular'];

  function userAPI(Restangular) {
    return Restangular.all('api_v1/user');
  }
}());
