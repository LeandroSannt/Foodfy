const express = require("express")
const routes =express.Router()
const recipes = require("./controller/admin")

routes.get("/admin/recipes", recipes.listing); // Mostrar a lista de receitas
routes.get("/admin/create", recipes.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipes.details); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita


module.exports = routes


