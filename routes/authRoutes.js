const passport = require('passport');

module.exports = (app) => {
  // Google Authentication Route Handlers
  app.get(
    '/auth/google', 
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google')
  );
}