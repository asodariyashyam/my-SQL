const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require("./db");

exports.initializingPassport = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      db.query(
        "SELECT * FROM user WHERE email = ?",
        [email],
        (err, results) => {
          if (err) return done(err);

          const user = results[0];

          if (!user) return done(null, false);

          bcrypt.compare(password, user.password, (err, checkpass) => {

            if (err) return done(err);

            if (checkpass) return done(null, user);

            return done(null, false);
          });
        }
      );
    })
  );

  passport.serializeUser((user, done) => {
    console.log(user);

    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    db.query("SELECT * FROM user WHERE id = ?", [id], (err, results) => {
      if (err) return done(err);

      return done(null, results[0]);
    });
  });
};
