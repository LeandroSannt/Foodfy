const express = require("express")
const routes = express.Router()
const multer = require("../app/middlewares/multer")
const recipes = require("../app/controller/recipes")
const RecipesValidator = require("../app/validators/recipes")
const { onlyUser} = require("../app/middlewares/session")

/*==========rotasRecipes==========*/

routes.get("",onlyUser, recipes.index); // Mostrar a lista de receitas
routes.get("/create",onlyUser, recipes.create); // Mostrar formulário de nova receita
routes.get("/details/:id",onlyUser,RecipesValidator.details, recipes.details); // Exibir detalhes de uma receita
routes.get("/details/:id/edit",onlyUser, recipes.edit); // Mostrar formulário de edição de receita

routes.post("",onlyUser,multer.array("photos",5),RecipesValidator.post, recipes.post); // Cadastrar nova receita
routes.put("",onlyUser,multer.array("photos",5),RecipesValidator.update,recipes.put); // Editar uma receita
routes.delete("",onlyUser, recipes.delete); // Deletar uma receita


module.exports = routes