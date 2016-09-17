const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const helmet = require('helmet');
const passport = require('./lib/passport');
const config = require('./config');
const routes = require('./api');
const winston = require('winston');
const app = express();

winston.level = config.logLevel;

mongoose.connect(config.db.url);

app.use(helmet());
app.use(express.static(path.resolve('.dist')));
app.use('/docs', express.static(`${__dirname}/docs`));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session(config.session));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);
app.get('/*', (req, res) => {
  res.sendFile(path.resolve('.dist/index.html'));
});
app.listen(config.port, () => {
  winston.info(`Server running on ${config.port}`);
});

