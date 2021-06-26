const express = require("express")
const routes = express.Router()

const UserController = require("../app/controller/user")
const ProfileController = require("../app/controller/profiler")

const UserValidator = require("../app/validators/user")
const ProfileValidator = require("../app/validators/profile")

const { onlyUser, permitAdmin,NotPermitDelete} = require("../app/middlewares/session")

/*==========rotasUser==========*/

routes.get('',permitAdmin,onlyUser, UserController.list) // Mostrar a lista de usuários cadastrados ok
routes.get('/new',permitAdmin,onlyUser,ProfileController.create) // criar novo usuario apos logado ok
routes.post('',permitAdmin,onlyUser, ProfileValidator.post,ProfileController.post) // Cadastrar um usuário ok
routes.get('/:id/edit',permitAdmin,onlyUser,UserValidator.find, UserController.edit) // Mostrar o formulário de edição de um usuário ok
routes.put('',permitAdmin,onlyUser, UserValidator.update,UserController.put) // Editar um usuário ok
routes.delete('',NotPermitDelete,permitAdmin,onlyUser, UserController.delete) // Deletar um us


module.exports = routes
