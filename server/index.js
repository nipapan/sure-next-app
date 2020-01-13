require('dotenv').config();

import express from 'express';
import next from 'next';
import { urlencoded, json } from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import router from './router';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({dev});
const handle = nextApp.getRequestHandler();

const port = 3000;

nextApp.prepare().then(async () => {
   const app = express();

   app.use(urlencoded({extended: true}));
   app.use(json());
   app.use(cookieParser());
   app.use(passport.initialize());

   router(app);

   app.get('*', (req, res) => {
      return handle(req, res);
   });

   app.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on port:${port}`);
   });
});
