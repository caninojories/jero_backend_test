(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('confirmPassword', confirmPassword);

    function confirmPassword() {
      var directive = {
        restrict: 'A',
        require: 'ngModel',
        link: link
      };

      return directive;

      function link(scope, element, attrs, ngModelCtrl) {
        function validateEqual(value) {
          var valid = (value === scope.$eval(attrs.confirmPassword));
          ngModelCtrl.$setValidity('equal', valid);
          return valid ? value : undefined;
        }
        ngModelCtrl.$parsers.push(validateEqual);
        ngModelCtrl.$formatters.push(validateEqual);

        scope.$watch(attrs.confirmPassword, function() {
          if (scope.signupForm.confirmPassword.$viewValue === scope.$eval(attrs.confirmPassword)) {
            ngModelCtrl.$setValidity('equal', true);
            scope.signupForm.confirmPassword.$invalid = false;
          } else {
            ngModelCtrl.$setValidity('equal', false);
          }
          ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
        });
      }
    }
}());
