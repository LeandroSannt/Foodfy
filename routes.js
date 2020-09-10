const express = require("express")
const routes =express.Router()
const recipes = require("./controller/admin")

/*=========ADMIN========*/

routes.get("/admin/listing", recipes.listing); // Mostrar a lista de receitas
routes.get("/admin/create", recipes.create); // Mostrar formulário de nova receita
routes.get("/admin/details/:id", recipes.details); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita

routes.post("/admin", recipes.post); // Cadastrar nova receita
routes.put("/admin", recipes.put); // Editar uma receita
routes.delete("/admin", recipes.delete); // Deletar uma receita


module.exports = routes


