import express from 'express'
import userController from '../controllers/usercontroller'
import bodyParser from 'body-parser'

const routes = express();

// routes.use(bodyParser.urlencoded({extended: true}));
// routes.use(bodyParser.json());


routes.get('/', (req, res) => {
  res.status(200).json({
    message: "Welcome to our API"
  })
})

routes.post('/createuser', (req, res) => {
    userController.create(req, res);
})

routes.post('/login', (req, res) => {
    userController.login(req, res);
})

export default routes;
