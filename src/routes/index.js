const express = require("express")
const routes =express.Router()
const foodfy = require("../app/controller/foodfy")

const recipes = require("./recipes")
const chefs = require("./chefs")
const user = require("./users")
const session = require("./session")
const profile = require("./profile")

/*=========FOODFY=========*/

routes.get("/", function (req,res){
  return res.redirect("foodfy")
})

routes.get('not-found', function(req, res) {
  res.render("/views/not-found");
});

routes.get("/foodfy",foodfy.index)
routes.get("/sobre", foodfy.sobre)
routes.get("/receitas", foodfy.receitas)
routes.get("/chefs", foodfy.chefs)
routes.get("/receita/:id", foodfy.abrirReceita)
routes.get("/buscar", foodfy.searchRecipes)

routes.use("/admin/recipes",recipes)
routes.use("/admin/chefs",chefs)
routes.use("/admin/users",user)
routes.use("/admin",session)
routes.use("/admin",profile)

module.exports = routes


