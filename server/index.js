const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const helmet = require('helmet');
const passport = require('./lib/passport');
const config = require('./config');
const routes = require('./api');
const app = express();

mongoose.connect(config.db.url);

app.use(helmet());
app.use(express.static('../public'));
app.use(cookieParser());
app.use(bodyParser());
app.use(session(config.session));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);

app.listen(config.port, () => {
  console.log(`Server running on ${config.port}`);
});

