const express = require("express");
const path=  require('path');

const cookieParser = require("cookie-parser");

const passport = require("passport");
const { initializingPassport } = require("./config/passport");
const expressSession = require("express-session");

const app = express();
const port = 8008;

app.set('view engine', 'ejs');
app.set('views', './views'); 

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// passport

initializingPassport(passport);

app.use(
  expressSession({
    secret: "usertoken",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// end passport

const cookies= require("./utils/common")
app.use(cookies.cookie);


app.use('/',require('./routes/index'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
