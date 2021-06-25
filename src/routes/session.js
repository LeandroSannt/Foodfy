const express = require("express")
const routes = express.Router()

const SessionValidator = require("../app/validators/session")
const SessionController = require("../app/controller/session")

const UserController = require("../app/controller/user")
const UserValidator = require("../app/validators/user")

/*==========rotasSession==========*/

routes.get('/login',SessionController.loginForm)
routes.post('/login',SessionValidator.login,SessionController.login)
routes.post('/logout',SessionController.logout)

routes.get('/forgot-password',SessionController.forgotForm)
routes.get('/password-reset',SessionController.resetForm)
routes.post('/forgot-password',SessionValidator.forgot,SessionController.forgot)
routes.post('/password-reset',SessionValidator.reset,SessionController.reset)

routes.get('/register',UserController.create) //ok
routes.post('/register',UserValidator.post,UserController.post) //ok

module.exports = routes
