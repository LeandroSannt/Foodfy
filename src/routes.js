const express = require("express")
const routes =express.Router()
const multer = require("./app/middlewares/multer")
const foodfy = require("./app/controller/foodfy")
const recipes = require("./app/controller/recipes")
const chefs = require("./app/controller/chefs")
const UserController = require("./app/controller/user")

routes.get("/", function (req,res){
  return res.redirect("foodfy")
})

/*=========FOODFY=========*/

routes.get("/foodfy",foodfy.index )
routes.get("/sobre", foodfy.sobre)
routes.get("/receitas", foodfy.receitas)
routes.get("/chefs", foodfy.chefs)
routes.get("/receita/:id", foodfy.abrirReceita)
routes.get("/buscar", foodfy.searchRecipes)

/*=========RECIPES========*/

routes.get("/admin/recipes", recipes.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/details/:id", recipes.details); // Exibir detalhes de uma receita
routes.get("/admin/recipes/details/:id/edit", recipes.edit); // Mostrar formulário de edição de receita

routes.post("/admin/recipes",multer.array("photos",5), recipes.post); // Cadastrar nova receita
routes.put("/admin/recipes",multer.array("photos",5),recipes.put); // Editar uma receita
routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita

/*=========CHEFS========*/

routes.get("/admin/chefs", chefs.index); // Mostrar a lista de receitas
routes.get("/admin/chefs/create", chefs.create); // Mostrar formulário de nova receita
routes.get("/admin/chefs/details/:id", chefs.details); // Exibir detalhes de uma receita
routes.get("/admin/chefs/details/:id/edit", chefs.edit); // Mostrar formulário de edição de receita

routes.post("/admin/chefs", chefs.post); // Cadastrar nova receita
routes.put("/admin/chefs", chefs.put); // Editar uma receita
routes.delete("/admin/chefs", chefs.delete); // Deletar uma receita

/*=========Users========*/

// Rotas de perfil de um usuário logado
routes.get('/admin/profile', UserController.profile) // Mostrar o formulário com dados do usuário logado
// routes.put('/admin/profile', ProfileController.put)// Editar o usuário logado

// Rotas que o administrador irá acessar para gerenciar usuários
routes.get('/admin/users', UserController.list) // Mostrar a lista de usuários cadastrados
routes.post('/admin/users', UserController.post) // Cadastrar um usuário
routes.get('/admin/users/create', UserController.create) // Mostrar o formulário de criação de um usuário
// routes.put('/admin/users/:id', UserController.put) // Editar um usuário
// routes.get('/admin/users/:id/edit', UserController.edit) // Mostrar o formulário de edição de um usuário
// routes.delete('/admin/users/:id', UserController.delete) // Deletar um usuário


routes.get('not-found', function(req, res) {
    res.render("/views/not-found");
  });


module.exports = routes


