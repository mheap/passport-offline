# passport-offline

passport-offline is an authentication strategy for [PassportJS](http://passportjs.org/) that I developed for
a project that I was working on that required Twitter authentication. Whilst Twitter auth
is useful, it made life very difficult when developing the app whilst offline, and so
passport-offline was born.

### Examples

There's only one example, as the provider is really simple. Whatever you pass into the 
first parameter as an object, you'll get back as the user's profile object. It's as
simple as that.

```
passport.use(new OfflineStrategy({
    "profile": {
      id: 1234,
      username: 'mheap' 
    }
  },
  function(user, done) {
    User.findOrCreate(profile, function (err, user) {
      done(err, user);
    });
  }
));
```
