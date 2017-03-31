import express from 'express'
import userController from '../controllers/usercontroller'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import path from 'path'
import models from '../models'

const routes = express();

routes.get('/profile', (req, res) => {
    if (!req.cookies.jwt) {
        res.status(403).send('Forbidden').end();
        return;
    }
    jwt.verify(req.cookies.jwt, 'secret key', (err, decoded) => {
        if (err) {
            res.status(403).send('Forbidden').end();
            return;
        } else {
            models.User.findOne({
                _id: decoded
            }, (error, result) => {
                if (error) {
                    console.error(error);
                    return;
                }
                if (result)
                    res.status(200).send('Welcome, ' + result.username);
                else
                    res.status(500).end();
            })
        }
    })
})


export default routes;
