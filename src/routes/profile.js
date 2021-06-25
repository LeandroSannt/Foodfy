const express = require("express")
const routes = express.Router()

const ProfileController = require("../app/controller/profiler")
const ProfileValidator = require("../app/validators/profile")

const { onlyUser} = require("../app/middlewares/session")

/*==========rotasProfile==========*/

routes.get('/profile',onlyUser, ProfileValidator.show,ProfileController.index) // Mostrar o formulário com dados do usuário logado ok
routes.put('/profile',onlyUser,ProfileValidator.update,ProfileController.update)// Editar o usuário logado ok

module.exports = routes
