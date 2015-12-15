(function() {
  'use strict';

  angular
    .module('app.promise.request')
    .factory('withParams', withParams);

    withParams.$inject = ['Restangular'];

    function withParams(Restangular) {
      var service = {
        HTTPGET     : HTTPGET,
        HTTPOST     : HTTPOST,
        HTTPUT      : HTTPUT,
        HTTPDELETE  : HTTPDELETE
      };

      return service;

      function HTTPGET(apiURL, apiSERVICE, params, queryParams) {
        return apiSERVICE.one(apiURL, params)
          .get(queryParams)
          .then(HTTPGETCALLBACK)
          .catch(function(response) {
            response.data = {};
            response.data._id = undefined;

            return response;
          });

        function HTTPGETCALLBACK(response, status, header, config) {
          return Restangular.stripRestangular(response);
        }
      }

      function HTTPOST(apiURL, apiSERVICE, params, queryParams) {
        return apiSERVICE.one(apiURL, params)
          .post(queryParams)
          .then(HTTPOSTCALLBACK)
          .catch(function(response) {
            response.data = {};
            response.data._id = undefined;

            return response;
          });

        function HTTPOSTCALLBACK(response, status, header, config) {
          return Restangular.stripRestangular(response);
        }
      }

      function HTTPUT(apiURL, apiSERVICE, params, queryParams) {
        return apiSERVICE.one(apiURL, params)
          .put(queryParams)
          .then(HTTPUTCALLBACK)
          .catch(function(response) {
            response.data = {};
            response.data._id = undefined;

            return response;
          });

          function HTTPUTCALLBACK(response, status, header, config) {
            return Restangular.stripRestangular(response);
          }
      }

      function HTTPDELETE(apiURL, apiSERVICE, params, queryParams) {
        return apiSERVICE.one(apiURL, params)
          .remove(queryParams)
          .then(HTTPDELETECALLBACK)
          .catch(function(response) {
            response.data = {};
            response.data._id = undefined;

            return response;
          });

          function HTTPDELETECALLBACK(response, status, header, config) {
            return Restangular.stripRestangular(response);
          }
      }
    }
}());
