import express from 'express'
import morgan from 'morgan';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import models from '../models'
import apiRoutes from './api-routes'
import routes from './routes'
import path from 'path'
import fs from 'fs'

const app = express();

fs.readFile(path.resolve(__dirname + '/../database'), 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    } else {
        login(data);
    }
});

const login = data => {
    mongoose.connect(data, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Successfully connected the the database...");
    });
}

/* Middleware */
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use('/api', apiRoutes);
app.use(routes);
app.use('/public', express.static(path.resolve(__dirname + '/../public')));

export default app;
