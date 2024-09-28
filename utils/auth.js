import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";

passport.use(new GitHubStrategy({
    clientID: "Ov23li327N2XvQ9nYVMU",
    clientSecret: "790252e70c497e4bd1a512a15989e3b85d5a7772",
    callbackURL: "http://localhost:3001/git/callback",
    passReqToCallback:true
  },
  function(req, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function(user, done){
  done(null, user);
});

export default passport;