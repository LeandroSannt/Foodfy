var {age, date} =require("../lib/configs/utils")
const { findRecipes } = require("../models/recipesModel")
var Recipes =require("../models/recipesModel")

module.exports={
    
index(req,res){

    Recipes.all(function(recipes){
        return res.render("admin/recipes/index",{recipes})
    })
    },

create(req,res){
    Recipes.chefSelectOptions(function(options){
        return res.render("admin/recipes/create",{chefOptions:options})

    })
    },
    
post(req,res){
            const keys = Object.keys(req.body)
            for (key of keys) {
                if (req.body[key] == "") 
                    return res.send("Dados Faltando")
                }
                Recipes.create(req.body,function(recipes){
                    return res.redirect(`/admin/recipes/details/${recipes.id}`)
                })
    },

details(req,res){ 
        Recipes.find(req.params.id,function(recipes){
            if(!recipes) return res.send("Receita não encontrada")
                recipes.created_at = date(recipes.created_at).format
                    return res.render("admin/recipes/details", {recipes})
        })
    },
    
edit(req,res){
    Recipes.find(req.params.id,function(recipes){
        if(!recipes) return res.send("Receita não encontrada")
            Recipes.chefSelectOptions(function(options){
                return res.render("admin/recipes/edit", {recipes, chefOptions:options})
            })
        })
    },
    
    
put(req,res){
    const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == "") 
            return res.send("Dados Faltando")
        }
        Recipes.update(req.body, function(){
            return res.redirect(`/admin/recipes`)  
        })
    },
    
delete(req,res){
    Recipes.delete(req.body.id,function(){
        return res.redirect ("/admin/recipes")
        })
    }
}

