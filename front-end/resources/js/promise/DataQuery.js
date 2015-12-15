(function() {
  'use strict';

  angular
    .module('app.promise')
    .factory('DataQuery', DataQuery);

    DataQuery.$inject = ['$q', '$timeout', 'withQuery'];
    /*@ngInject*/
    function DataQuery($q, $timeout, withQuery) {
      var service = {
        get : get,
        post: post
      };

      return service;

      function get(api, restApi, queryParams) {
        return $q(function(resolve, reject) {
          $timeout(function() {
            withQuery
              .HTTPGET(api, restApi, queryParams)
              .then(function(response) {
                resolve(response);
              });
          }, 0);
        });
      }

      function post(api, restApi, queryParams) {
        return $q(function(resolve, reject) {
          $timeout(function() {
            withQuery
              .HTTPOST(api, restApi, queryParams)
              .then(function(response) {
                resolve(response);
              });
          }, 0);
        })
      }
    }
}());
