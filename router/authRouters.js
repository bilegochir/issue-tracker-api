const conf = require('../config/authConfig')
const jwt = require('jsonwebtoken')
const User = require('../model/User')
const verifyToken = require('../controller/authController')

var routes = function (app) {

    app.post("/auth/login", function(req, res) {
        User.findOne({username: req.body.username}, (err, user) => {
            if(user != null && req.body.password != null) {
                user.comparePassword(req.body.password, (err, isMatch) => {
    
                    if (err) {
                        res.status(401).send('Username or password wrong.')
                    }
                    
        
                    if (isMatch) {
                        const userJson = user.toJSON()
                        res.send({
                            user: userJson,
                            token: jwt.sign(userJson, conf.authentication.jwtSecret, {
                                expiresIn: 60 * 60
                            })
                        })
                    } else {
                        res.status(401).send('Username or password wrong.')
                    }
                })
            } else {
                res.status(401).send('Username or password wrong.')
            }
        })
    })

    app.post("/auth/register", function(req, res) {
        let newUser = new User(req.body);
        newUser.save((err, user) => {

            if (err)
                res.send(err)

            res.json(user)
        })
    })

    app.get("/user", verifyToken, function(req, res) {
        jwt.verify(req.token, conf.authentication.jwtSecret, function(err, data) {

            if (err) {
                res.status(403).send(err.name)
            } else {
                User.find({}, (error, user) => {
                    if (error)
                        res.send(error);
            
                    res.json(user);
                })
            }
        })
    })

    app.get("/userById", verifyToken, function(req, res) {
        jwt.verify(req.token, conf.authentication.jwtSecret, function(err, data) {
            if (err) {
                console.log(err)
                res.status(403).send(err.name)
            } else {
                User.findOne({ _id: req.query.member_id }, (error, user) => {
                    if (error)
                        res.send(error);

                    
            
                    res.json(user);
                })
            }
        })
    })

}

module.exports = routes;