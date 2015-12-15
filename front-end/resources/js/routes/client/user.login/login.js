(function() {
  'use strict';

  angular
    .module('app.login')
    .controller('Login', Login);

    /*Inject angular related directive*/
    Login.$inject = [
      /*angular services/factory*/
      '$q', '$rootScope', '$timeout',
      /*third party services/factory*/
      '$auth',
      /*custom services/factory*/
      'strapAlert', 'strapModal', 'gravatarCache'
      /*custom directives*/
    ];

    function Login(
      $q, $rootScope, $timeout,
      $auth,
      strapAlert, strapModal, gravatarCache
    ) {
      var vm = this;

      /* Variable Initialization */
      vm.user = {};

      /* Function Initialization */
      vm.isAuthenticated = $auth.isAuthenticated;
      vm.authenticate    = authenticate;
      vm.logInUser       = logInUser;
      vm.logOut          = logOut;
      vm.login           = login;

      function logInUser() {
        strapModal.show('am-fade-and-scale', 'center', 'commons/login.html');
      }

      function logOut() {
        $auth.logout();
        gravatarCache.removeGravatar();
        $rootScope.gravatar = null;
      }

      function login(isLoginFormValid) {
        if (!isLoginFormValid) {return;}

        $auth.login({
          email: vm.email,
          password: vm.password
        }).then(function(response) {
          $timeout(function() {
            $rootScope.gravatar = response.data.gravatar;
            /* set the cache for gravatar */
            gravatarCache.setGravatar(response.data.gravatar);
          }, 0);
          strapModal.hide();
        }).catch(function(error) {
          strapAlert.show('Something, went wrong!', 'Wrong email/password', 'alert-logIn');
          $timeout(function() {
            strapAlert.hide();
          }, 2000);
        });
      }

      function loginCallBack() {
        return commonsDataService
          .login('userLogIn', {
            email: vm.email,
            password: vm.password
          })
          .then(function(response) {
            return response;
          });
      }

      function authenticate(provider) {
        $auth.authenticate(provider)
        .then(function(response) {
          $rootScope.username = response.data.user.displayName || response.data.user.username;
          vm.isAuthenticated = $auth.isAuthenticated;
        }, function(err) {
          if (err) {throw err;}
        });
      }
    }
}());
