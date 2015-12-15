(function() {
  'use strict';

  angular
    .module('app.main')
    .run(appRun);

    appRun.$inject = ['routeHelper'];
    /*@ngInject*/
    function appRun(routeHelper) {
      routeHelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
      return [{
        state: 'main',
        config: {
          url: '/',
          templateUrl: '/client/main/index.html',
          controller: 'Main as vm'
        }
      }];
    }
}());
