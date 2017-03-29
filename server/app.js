import express from 'express'
import morgan from 'morgan';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import models from '../models'

import routes from './routes'

const app = express();

mongoose.connect("mongodb://localhost:27017/auth", (err) => {
  if (err){
    console.log(err);
    return;
  }
console.log("Successfully connected the the database...");
});

/* Middleware */

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api', routes);

export default app;
