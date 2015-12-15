(function() {
  'use strict';

    /* jshint -W117, -W030 */
  describe('Main', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('app.main');
        bard.inject('$controller', '$log', '$rootScope');
    });

    beforeEach(function () {
        controller = $controller('Main');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Main controller', function() {
      it('should be created successfully', function () {
          expect(controller).to.be.defined;
      });

      describe('after activate', function() {
        it('should have logged "Activated"', function() {
            expect($log.info.logs).to.match(/Activated/);
        });
      });
    });
  });
}());
