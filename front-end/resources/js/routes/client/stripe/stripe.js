(function() {
  'use strict';

  angular
    .module('app.stripe')
    .controller('Stripe', Stripe);

  Stripe.$inject = [
    /*angular services/factory*/
    /*third party services/factory*/
    'stripe',
    /*custom services/factory*/
    'DataParams', 'strapModal', 'userAPI'
    /*custom directives*/
  ];
  /*@ngInject*/
  function Stripe(
    stripe,
    DataParams, strapModal, userAPI
  ) {
    var vm = this;

    vm.user = {};

    vm.subscriptionPlan = subscriptionPlan;

    function subscriptionPlan() {
      console.log('subscribe');
        vm.user.card                = {};
        vm.user.card.submitted      = true;
        vm.user.card.error          = {};
        vm.user.card.error.number   = stripe.card.validateCardNumber(vm.user.creditCardNum);
        vm.user.card.error.exp      = stripe.card.validateExpiry(vm.user.creditCardExpMonth, vm.user.creditCardExpYear);
        vm.user.card.error.cv2      = stripe.card.validateCVC(vm.user.creditCardCV2);

        /*test for the errors*/
        if (!vm.user.card.error.number || !vm.user.card.error.exp || !vm.user.card.error.cv2 || !vm.user.subscriptionPlan) {
          return;
        } else {
          /*make a post call for subscription*/
          return stripe.card.createToken({
            number: vm.user.creditCardNum,
            cvc: vm.user.creditCardCV2,
            exp_month: vm.user.creditCardExpMonth,
            exp_year: vm.user.creditCardExpYear
          })
          .then(function (token) {
            var data = new DataParams.update(
              'plan',
              userAPI,
              token.id, {
                plan: vm.user.subscriptionPlan
              }
            ).then(function(response) {
              if (response._id !== undefined) {
                /* show an alert */
                strapModal.show('am-fade-and-scale', 'center', 'commons/stripe_success.html');
                /* make the model empty */
                vm.user.subscriptionPlan    = vm.user.subscriptionPlan;
                vm.user.creditCardNum       = '';
                vm.user.creditCardExpMonth  = '';
                vm.user.creditCardExpYear   = '';
                vm.user.creditCardCV2       = '';
              }
            });
          });
        }
      }
  }
}());
