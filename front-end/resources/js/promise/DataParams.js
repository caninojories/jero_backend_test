(function() {
  'use strict';

  angular
    .module('app.promise')
    .factory('DataParams', DataParams);

    DataParams.$inject = ['$q', '$timeout', 'withParams'];

    function DataParams($q, $timeout, withParams) {
      var service = {
        get   : get,
        post  : post,
        update: update,
        del   : del
      };

      return service;

      function get(api, restApi, params, queryParams) {
        return $q(function(resolve, reject) {
          $timeout(function() {
            withParams
              .HTTPGET(api, restApi, params, queryParams)
              .then(function(response) {
                resolve(response);
              });
          }, 0);
        });
      }

      function post(api, restApi, params, queryParams) {
        return $q(function(resolve, reject) {
          $timeout(function() {
            withParams
              .HTTPOST(api, restApi, params, queryParams)
              .then(function(response) {
                resolve(response);
              });
          }, 0);
        });
      }

      function update(api, restApi, params, queryParams) {
        return $q(function(resolve, reject) {
          $timeout(function() {
            withParams
              .HTTPUT(api, restApi, params, queryParams)
              .then(function(response) {
                resolve(response);
              });
          }, 0);
        });
      }

      function del(api, restApi, params, queryParams) {
        return $q(function(resolve, reject) {
          $timeout(function() {
            withParams
              .HTTPDELETE(api, restApi, params, queryParams)
              .then(function(response) {
                resolve(response);
              });
          }, 0);
        });
      };
    }
}());
