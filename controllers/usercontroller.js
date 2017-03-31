import models from '../models'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userController = {};

userController.create = (req, res) => {
    const {
        username,
        password
    } = req.body;
    if (!username || !password) return;
    if (password.length < 7) res.status(422).json({
        message: "Password must be at least 8 characters"
    });
    models.User.findOne({
        username: req.body.username
    }, (err, person) => {
        if (err) {
            console.error(err);
            return;
        } else if (person !== null) {
            res.status(422).json({
                message: "Username already taken"
            });
            return;
        } else {
            const salt = bcrypt.genSaltSync(10);
            console.log(salt);
            const hash = bcrypt.hashSync(password, salt);
            console.log(hash);
            const user = new models.User({
                username,
                hash,
                salt
            });

            user.save().then((user) => {
                res.status(200).json({
                    sucess: true,
                });
            }).catch((err) => {
                console.error(err);
                res.status(500).json({
                    message: "Internal server error"
                })
            });
        }
    });
}

userController.login = (req, res) => {
    const {
        username,
        password
    } = req.body;
    if (!username || !password) return;
    models.User.findOne({
        username: req.body.username
    }, (err, person) => {
        if (err) {
            console.error(err);
            return;
        }
        if (person == null) {
            res.status(422).json({
                message: "Invalid username or password"
            });
            return;
        } else {
            const hash = bcrypt.hashSync(password, person.salt);
            if (hash === person.hash) {
                res.status(200).json({
                    id: person._id,
                    message: "Success",
                    jwt: jwt.sign(person._id.toString(), 'secret key')
                });
            } else {
                res.status(422).json({
                    message: "Invalid username or password"
                });
            }
        }
    })
}

export default userController;
