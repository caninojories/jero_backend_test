(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('authToken', authToken);

    authToken.$inject = ['$window'];

  /* note this will be used if we don't use the sattelizer third party*/
  /* @ngInject */
  function authToken($window) {
    var storage = $window.localStorage;
    var cachedToken;
    var userToken = 'magens_token';

    var authUserToken = {
      setToken: function(token) {
        cachedToken = token;
        storage.setItem('userToken', token);
      },
      getToken: function() {
        if (!cachedToken) {
          cachedToken = storage.getItem(userToken);
        }

        return cachedToken;
      },
      isAuthenticated: function() {
        return !!authUserToken.getToken();
      },
      removeToken: function() {
        cachedToken = null;
        storage.removeItem(userToken);
      }
    };

    return authUserToken;
  }
}());
