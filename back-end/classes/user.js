(function() {
  'use strict';

  class USER {
    constructor(req, res, next) {
      this.req  = req;
      this.res  = res;
      this.next = next;
    }

    check_email() {
      let self = this;
      return new Promise(function(resolve, reject) {
        let query = io.url.parse(self.req.url, true).query;

        io.User
          .findOne({
            email: query.email
          })
          .then(function(user, err) {
            if (err) {reject(err);}

            if (user) {
              resolve(user);
            } else {
              resolve(null);
            }
          })
      });
    }

    static createToken(user) {
      return new Promise(function(resolve, reject) {
        var payload = {
          sub: user._id.toString(),
          exp: io.moment().add(5, 'days').unix()
        };

        var token = io.jwt.encode(payload, 'shhh..');
        resolve(token);
      });
    }
  }

  module.exports = USER;
}());
