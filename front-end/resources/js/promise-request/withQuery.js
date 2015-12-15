(function() {
  'use strict';

  angular
    .module('app.promise.request')
    .factory('withQuery', withQuery);

    withQuery.$inject = ['Restangular'];

    function withQuery(Restangular) {
      var service = {
        HTTPGET : HTTPGET,
        HTTPOST : HTTPOST
      };

      return service;

      function HTTPGET(apiURL, apiSERVICE, queryParams) {
        return apiSERVICE.one(apiURL)
          .get(queryParams)
          .then(HTTPGETCALLBACK)
          .catch(function(response) {
            response.data._id = undefined;
            return response;
          });

        function HTTPGETCALLBACK(response, status, header, config) {
          return Restangular.stripRestangular(response);
        }
      }

      function HTTPOST(apiURL, apiSERVICE, queryParams) {
        return apiSERVICE.all(apiURL)
          .post(queryParams)
          .then(HTTPOSTCALLBACK)
          .catch(function(response) {
            response.data._id = undefined;
            return response;
          });

        function HTTPOSTCALLBACK(response, status, header, config) {
          return Restangular.stripRestangular(response);
        }
      }
    }
}());
