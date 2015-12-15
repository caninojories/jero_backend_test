(function() {
  'use strict';

  module.exports = {
    dbName      : 'mongodb://localhost:27017/jero',
    stripeOptions: {
      apiKey: process.env.STRIPE_KEY,
      stripePubKey: process.env.STRIPE_PUB_KEY,
      defaultPlan: 'free',
      plans: ['free', '89', '249', '469', '749'],
      planData: {
        'free': {
          name: 'Free',
          price: 0
        },
        '89': {
          name: 'Silver',
          price: 89
        },
        '249': {
          name: 'Bronze',
          price: 249
        },
        '469': {
          name: 'Gold',
          price: 469
        },
        '749': {
          name: 'Platinum',
          price: 749
        }
      }
    },
  };
}());
