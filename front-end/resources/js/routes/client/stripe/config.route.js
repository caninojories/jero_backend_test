(function() {
  'use strict';

  angular
    .module('app.stripe')
    .run(appRun);

    appRun.$inject = ['routeHelper'];
    /*@ngInject*/
    function appRun(routeHelper) {
      routeHelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
      return [{
        state: 'stripe',
        config: {
          url: '/stripe',
          templateUrl: '/client/stripe/index.html',
          controller: 'Stripe as vm',
          resolve: {
            isLogin: function($auth, $state, $timeout) {
              console.log($auth.isAuthenticated() !== true);
              if ($auth.isAuthenticated() !== true) {
                $timeout(function() {
                  $state.go('main');
                }, 0);
              }
            }
          }
        }
      }];
    }
}());
