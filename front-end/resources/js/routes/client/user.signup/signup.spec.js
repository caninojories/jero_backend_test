(function() {
  'use strict';

  /* jshint -W117, -W030 */
  describe('Signup Controller', function() {
    var I_controller,
        A_controller,
        form,
        form_elem,
        sign_form = {},
        template_html,
        email = [{
          message : 'Retriving Email Details',
          status  : 200,
          data    : {
            email : 'canino_jories@hotmail.com'
          }
        }];
    beforeEach(function() {
      bard.appModule('app.signup');
      bard.inject('$compile', '$controller', '$log', '$httpBackend', '$q', '$rootScope', '$templateCache',
      'exception', 'DataQuery', 'userAPI');
    });

    beforeEach(function () {
      I_controller  = $controller('Signup');
      A_controller  = $controller('Signup');
    });

    beforeEach(function () {
      sinon.stub(DataQuery, 'get').returns($q.when(email));
      template_html = $templateCache.get('commons/register.html');
      form_elem = angular.element('<div>' + template_html + '</div>');
      form = form_elem.find('form').eq(0);
      $compile(form)($rootScope);
      A_controller.check_email_in_blurred($rootScope.vm.signup.form);
    });

    beforeEach(function () {
      DataQuery.get.restore();
      sinon.stub(DataQuery, 'get').returns($q.when([]));
      template_html = $templateCache.get('commons/register.html');
      form_elem = angular.element('<div>' + template_html + '</div>');
      form = form_elem.find('form').eq(0);
      $compile(form)($rootScope);
    });

    describe('Signup controller', function() {
      it('controller is defined and exist', function() {
        expect(I_controller).to.be.defined;
        expect(A_controller).to.be.defined;
      });

      it('should have a user instantiation', function() {
        expect(I_controller.user).to.exist;
      });

      it('should have a check_email_in_blurred instantiation', function() {
        expect(I_controller.check_email_in_blurred).to.exist;
      });

      it('should have a registerUser instantiation', function() {
        expect(I_controller.user.signup).to.exist;
      });

      describe('should call function/s', function() {
        it('should call check_email_in_blurred', function() {
          A_controller.check_email_in_blurred($rootScope.vm.signup.form);
          $rootScope.$apply();
        });

        it('should call check_email_in_blurred', function() {
          A_controller.user.signup();
          $rootScope.$apply();
        });
      });
    });
  });
}());
