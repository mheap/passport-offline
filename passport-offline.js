/**
 * Module dependencies.
 */
var passport = require('passport')
  , util = require('util');


/**
 * `Strategy` constructor.
 *
 * The offline authentication strategy authenticates requests using
 * by returning any data that is passed into the constructor
 *
 * Options:
 *   - `profile`        profile to return
 *
 * Examples:
 *
 *     passport.use(new OfflineStrategy({
 *         "profile": {
 *           id: 1234,
 *           username: 'mheap'
 *         }
 *       },
 *       function(user, done) {
 *         User.findOrCreate(profile, function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  if (typeof options == 'function') {
    verify = options;
    options = {};
  }
  if (!verify) throw new Error('offline authentication strategy requires a verify function');

  passport.Strategy.call(this);
  this.name = 'offline';
  this._options = options;
  this._verify = verify;
  this._passReqToCallback = options.passReqToCallback;
}

/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(Strategy, passport.Strategy);

/**
 * Authenticate request based on the contents of a hash link.
 *
 * @param {Object} req
 * @api protected
 */
Strategy.prototype.authenticate = function(req) {
  var self = this;

  function verified(err, user) {
    if (err) { return self.error(err); }
    if (!user) { return self.fail(); }
    self.success(user);
  }

  if (self._passReqToCallback) {
    this._verify(req, this._options.profile, verified);
  } else {
    this._verify(this._options.profile, verified);
  }
}


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
