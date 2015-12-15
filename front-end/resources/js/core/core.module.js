(function() {
    'use strict';

    angular.module('app.core', [
        /*
         * Angular modules
         */
        'ngAnimate',
        'ui.router',
        'restangular',
        //'ngSanitize',
        /**
         * Commons module
         **/
        'app.layout',
        'app.promise',
        'app.promise.request',
        'app.services',
        'app.widgets',
        'ngConfig',
        /*
         * Our reusable cross app code modules
         */
        'blocks.exception',
        'blocks.logger',
        'blocks.router',
        /*
         * 3rd Party modules
         */
        'angular-stripe',
        'angular-loading-bar',
        'mgcrea.ngStrap',
        'satellizer'
    ]);
})();
