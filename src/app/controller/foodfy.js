var {age, date} =require("../lib/configs/utils")
var Chefs =require("../models/chefsModel")
var Recipes =require("../models/recipesModel")

module.exports ={

index(req,res){
    Recipes.all(function(recipes){
        Chefs.findRecipes(recipes.id,function(chefs){
            return res.render("foodfy/index",{chefs,recipes})
            })
        })
    },
    
sobre(req, res) {
        return res.render("foodfy/sobre")
    },
    
receitas(req, res) {
    let {filter,page,limit} =req.query

        page= page || 1
        limit = limit || 3
        let offset = limit *(page-1)

        const params= {
            filter,
            page,
            limit,
            offset,
            callback(recipes){
                const pagination ={
                    total:Math.ceil(recipes[0].total/limit),
                    page
                }
                    return res.render("foodfy/receitas",{filter,pagination,recipes})
        }
    }
    Recipes.paginate(params)
},

chefs(req,res){
    Chefs.all(function(chefs){
        return res.render("foodfy/chefs",{chefs})
        })
    },
    
abrirReceita(req, res) {
    Recipes.find(req.params.id,function(recipes){
        if(!recipes) return res.send("Receita não encontrada")
        return res.render(`foodfy/receita`,{recipes})
        })
    },

searchRecipes(req,res){
   const {filter} = req.query

   if(filter){
       Recipes.findBy(filter,function(recipes){
        return res.render(`foodfy/searchRecipes`,{recipes,filter})
       })

   }else{
    Recipes.all(function(recipes){
            return res.render("foodfy/searchRecipes",{recipes})
            })
        }
    }
}