require('dotenv').config();

const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const passport = require('passport');

const JwtAuth = require('./middlewares/jwtAuth');

import router from './router';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({dev});
const handle = nextApp.getRequestHandler();

const port = 3000;

const knex = require('./config/database');
const { Model } = require('objection');
Model.knex(knex);

nextApp.prepare().then(async () => {
   const app = express();
   app.use(passport.initialize());
   app.use(bodyParser.urlencoded({extended: true}));
   app.use(bodyParser.json());
   app.use(cookieParser());

   passport.use(JwtAuth);

   router(app);

   app.get('*', passport.authenticate('jwt', {session: false}), (req, res) => {
      return handle(req, res);
   });

   app.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on port:${port}`);
   });
});
