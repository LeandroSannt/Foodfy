const express = require("express")
const routes = express.Router()
const multer = require("../app/middlewares/multer")
const chefs = require("../app/controller/chefs")
const ChefsValidator = require("../app/validators/chefs")
const { onlyUser, permitAdmin} = require("../app/middlewares/session")

/*==========rotasChefs==========*/

routes.get("",onlyUser, chefs.index); // Mostrar a lista de receitas
routes.get("/create",onlyUser,permitAdmin,chefs.create); // Mostrar formulário de nova receita
routes.get("/details/:id",onlyUser, chefs.details); // Exibir detalhes de uma receita
routes.get("/details/:id/edit",onlyUser,permitAdmin, chefs.edit); // Mostrar formulário de edição de receita

routes.post("",onlyUser,permitAdmin,multer.array("chef_photos", 1),onlyUser,ChefsValidator.post, chefs.post); // Cadastrar nova receita
routes.put("",onlyUser,permitAdmin,multer.array("chef_photos", 1),onlyUser, chefs.put); // Editar uma receita
routes.delete("",onlyUser,permitAdmin, chefs.delete); // Deletar uma receita

module.exports = routes
