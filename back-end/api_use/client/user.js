(function() {
  'use strict';

  let app = io.express();

  app.route('/email/check')
    .get(function(req, res, next) {
      let User = new io.USER(req, res, next);

      User
        .check_email()
        .then(function(user) {
          if (user) {
            res.json({
              message : 'Email Check',
              status  : 200,
              data    : {
                user : user
              }
            });
          } else {
            res.json({
              message : 'Email Check',
              status  : 200,
              data    : {
                user : null
              }
            });
          }
        });
    });

  module.exports = app;
}());
