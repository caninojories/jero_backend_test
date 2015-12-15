(function() {
    'use strict';

    var config = {
      appErrorPrefix: '[Magens Error] ',
      appTitle: 'MAGENS Boilerplate',
      version: '0.0.0'
    };

    angular
      .module('app.core')
      .value('config', config)
      .config(configure)
      .config(toastrConfig)
      .config(registerNsignInConfig)
      .config(stripePublisherKey);

    toastrConfig.$inject = ['toastr'];
    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    registerNsignInConfig.$inject = ['$authProvider', 'cfpLoadingBarProvider'];
    /* @ngInject */
    function registerNsignInConfig($authProvider, cfpLoadingBarProvider) {
      cfpLoadingBarProvider.latencyThreshold = 100;
      $authProvider.loginUrl    = window.location.origin + '/api_v1/user/login';
      $authProvider.signupUrl   = window.location.origin + '/api_v1/user/signup';
      $authProvider.tokenPrefix = 'magens';
    }

    configure.$inject = ['$httpProvider', '$locationProvider', '$logProvider', '$urlRouterProvider',
      '$stateProvider', 'exceptionHandlerProvider', 'routeHelperProvider'];
    /* @ngInject */
    function configure ($httpProvider, $locationProvider, $logProvider, $urlRouterProvider,
      $stateProvider, exceptionHandlerProvider, routeHelperProvider) {
        $locationProvider.html5Mode(true);
        $logProvider.debugEnabled(true);
        $httpProvider.interceptors.push('authInterceptor');
        /*Configure the common exception handler*/
        exceptionHandlerProvider.configure(config.appErrorPrefix);
    }

    stripePublisherKey.$inject = ['stripeProvider'];
    /*@ngInject*/
    function stripePublisherKey(stripeProvider) {
      stripeProvider.setPublishableKey('pk_test_VEAPaGX3dlnSimATBUrthW95');
    }
}());
