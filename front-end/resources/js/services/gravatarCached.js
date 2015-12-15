(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('gravatarCache', gravatarCache);

    gravatarCache.$inject = ['$window'];

  /* @ngInject */
  function gravatarCache($window) {
    var storage = $window.localStorage;
    var cachedGravatar;
    var gravatarToken = 'magens_gravatar';

    var userGravatar = {
      setGravatar : function(url) {
        cachedGravatar = url;
        storage.setItem(gravatarToken, url);
      },
      getGravatar: function() {
        if (!cachedGravatar) {
          cachedGravatar = storage.getItem(gravatarToken);
        }

        return cachedGravatar;
      },
      removeGravatar: function() {
        cachedGravatar = null;
        storage.removeItem(gravatarToken);
      }
    };

    return userGravatar;
  }
}());
