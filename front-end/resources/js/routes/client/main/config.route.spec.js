(function() {
  /* jshint -W117, -W030 */
  'use strict';
  describe('main route', function () {
    describe('state', function () {
        var controller;
        var view = '/client/main/index.html';

        beforeEach(function() {
            module('app.main', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        it('should map state admin to url /admin ', function() {
            expect($state.href('main', {})).to.equal('/');
        });

        it('should map /admin route to admin View template', function () {
            expect($state.get('main').templateUrl).to.equal(view);
        });

        it('of admin should work with $state.go', function () {
            $state.go('main');
            $rootScope.$apply();
            expect($state.is('main'));
        });
    });
  });
}());
