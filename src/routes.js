const express = require("express")
const routes =express.Router()
const multer = require("./app/middlewares/multer")
const foodfy = require("./app/controller/foodfy")
const recipes = require("./app/controller/recipes")
const chefs = require("./app/controller/chefs")

const UserController = require("./app/controller/user")
const ProfileController = require("./app/controller/profiler")
const SessionController = require("./app/controller/session")

const UserValidator = require("./app/validators/user")
const ProfileValidator = require("./app/validators/profile")
const SessionValidator = require("./app/validators/session")


const { onlyUser, permitAdmin} = require("./app/middlewares/session")


routes.get("/", function (req,res){
  return res.redirect("foodfy")
})

/*=========FOODFY=========*/

routes.get("/foodfy",foodfy.index)
routes.get("/sobre", foodfy.sobre)
routes.get("/receitas", foodfy.receitas)
routes.get("/chefs", foodfy.chefs)
routes.get("/receita/:id", foodfy.abrirReceita)
routes.get("/buscar", foodfy.searchRecipes)

/*=========RECIPES========*/

routes.get("/admin/recipes",onlyUser, recipes.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create",onlyUser, recipes.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/details/:id",onlyUser, recipes.details); // Exibir detalhes de uma receita
routes.get("/admin/recipes/details/:id/edit", recipes.edit); // Mostrar formulário de edição de receita

routes.post("/admin/recipes",multer.array("photos",5), recipes.post); // Cadastrar nova receita
routes.put("/admin/recipes",multer.array("photos",5),recipes.put); // Editar uma receita
routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita

/*=========CHEFS========*/

routes.get("/admin/chefs",onlyUser, chefs.index); // Mostrar a lista de receitas
routes.get("/admin/chefs/create",permitAdmin,onlyUser, chefs.create); // Mostrar formulário de nova receita
routes.get("/admin/chefs/details/:id",onlyUser, chefs.details); // Exibir detalhes de uma receita
routes.get("/admin/chefs/details/:id/edit",permitAdmin, chefs.edit); // Mostrar formulário de edição de receita

routes.post("/admin/chefs",onlyUser,permitAdmin, chefs.post); // Cadastrar nova receita
routes.put("/admin/chefs",onlyUser,permitAdmin, chefs.put); // Editar uma receita
routes.delete("/admin/chefs",onlyUser,permitAdmin, chefs.delete); // Deletar uma receita

/*=========Session=======*/

routes.get('/admin/login',SessionController.loginForm)
routes.post('/admin/login',SessionValidator.login,SessionController.login)
routes.post('/admin/logout',SessionController.logout)

routes.get('/admin/forgot-password',SessionController.forgotForm)
routes.get('/admin/password-reset',SessionController.resetForm)
routes.post('/admin/forgot-password',SessionValidator.forgot,SessionController.forgot)
routes.post('/admin/password-reset',SessionValidator.reset,SessionController.reset)

routes.get('/admin/register',UserController.create) //ok
routes.post('/admin/register',UserValidator.post,UserController.post) //ok


/*===========Profile======= */
// Rotas de perfil de um usuário logado
routes.get('/admin/profile',onlyUser, ProfileValidator.show,ProfileController.index) // Mostrar o formulário com dados do usuário logado ok
routes.put('/admin/profile',ProfileValidator.update,ProfileController.update)// Editar o usuário logado ok

/*==========rotasUser==========*/

// Rotas que o administrador irá acessar para gerenciar usuários
routes.get('/admin/users',permitAdmin,onlyUser, UserController.list) // Mostrar a lista de usuários cadastrados ok
routes.get('/admin/users/new',permitAdmin,onlyUser, ProfileValidator.show,ProfileController.create) // criar novo usuario apos logado ok
routes.post('/admin/users',permitAdmin, ProfileValidator.post,ProfileController.post) // Cadastrar um usuário ok
routes.get('/admin/users/:id/edit',onlyUser,UserValidator.find, UserController.edit) // Mostrar o formulário de edição de um usuário ok
routes.put('/admin/users', UserValidator.update,UserController.put) // Editar um usuário ok
// routes.delete('/admin/users/:id', UserController.delete) // Deletar um usuário

routes.get('not-found', function(req, res) {
    res.render("/views/not-found");
  });


module.exports = routes


