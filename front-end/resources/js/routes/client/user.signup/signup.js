(function() {
  'use strict';

  angular
    .module('app.signup')
    .controller('Signup', Signup);

    Signup.$inject = [
      /*angular services/factory*/
      '$q', '$rootScope', '$timeout',
      /*third party services/factory*/
      '$auth',
      /*custom services/factory*/
      'exception', 'DataQuery', 'userAPI', 'gravatarCache',
      /*custom directives*/
      'strapModal', 'strapAlert'
    ];

    function Signup($q, $rootScope, $timeout,
      $auth,
      exception, DataQuery, userAPI, gravatarCache,
      strapModal, strapAlert) {
      var vm = this;
      /*Initialization*/
      vm.user                     = {};
      vm.isAuthenticated          = $auth.isAuthenticated;
      /*Functions*/
      vm.check_email_in_blurred   = check_email_in_blurred;
      vm.user.modal_signup        = modal_signup;
      vm.user.signup              = signup;

      function modal_signup() {
        strapModal.show('am-fade-and-scale', 'center', 'commons/register.html');
      }

      function check_email_in_blurred(sign_form) {
        return new DataQuery
          .get(
            'email/check',
            userAPI, {
              email: vm.email
            }
          ).then(function(response) {
            if (response.data.user !== null) {
              sign_form.email.$setValidity('taken', false);
            } else {
              sign_form.email.$setValidity('taken', true);
            }
          });
      }

      function signup(signup_form_is_valid) {
        if (signup_form_is_valid !== true) {return;}

        $auth.signup({
          email: vm.email,
          password: vm.password,
          username: vm.username
        }).then(function(response) {
          console.log(response);
          $rootScope.username = vm.username;
          strapModal.hide();
          $timeout(function() {
            /* then log the user */
            login();
          }, 2000);
        }).catch(function(err) {
          console.log(err);
          exception.catcher('Error in signing using local sign-up')(err);
        });
      }

      function login() {
        $auth.login({
          email: vm.email,
          password: vm.password
        }).then(function(response) {
          $timeout(function() {
            $rootScope.gravatar = response.data.gravatar;
            /* set the cache for gravatar */
            gravatarCache.setGravatar(response.data.gravatar);
          }, 0);
        }).catch(function(error) {
          strapAlert.show('Something, went wrong!', 'Wrong email/password', 'alert-logIn');
          $timeout(function() {
            strapAlert.hide();
          }, 2000);
        });
      }
    }
}());
