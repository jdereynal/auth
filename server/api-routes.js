import express from 'express'
import userController from '../controllers/usercontroller'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import models from '../models'

const routes = express();

routes.post('/createuser', (req, res) => {
    userController.create(req, res);
})

routes.post('/login', (req, res) => {
    userController.login(req, res);
})

export default routes;