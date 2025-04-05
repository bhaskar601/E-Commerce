const passport = require('passport');

const auth = passport.authenticate('jwt', { session: false });
// this is man
module.exports = auth;
