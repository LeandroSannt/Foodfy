var {age, date} =require("../lib/configs/utils")
var Chefs =require("../models/chefsModel")
var Recipes =require("../models/recipesModel")

module.exports ={

async index(req,res){
    let results = await Recipes.all()
    const recipes = results.rows

    if (!recipes) return res.send("produtos não encontrado")


    async function getImage(RecipeId){
            let results = await Recipes.files(RecipeId)
            const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`)
            return files[0]
        }
        
        const recipesPromise = recipes.map(async recipe=>{
            recipe.img = await getImage(recipe.id)

            return recipe
        }).filter((recipe,index)  => index > 2 ? false : true)
        
        
        
        results = await Chefs.findRecipes(req.params.id)
        const chefs =results.rows[0]
        
        const lastAdded = await Promise.all(recipesPromise)    
            return res.render("foodfy/index",{chefs,recipes:lastAdded})
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

async chefs(req,res){
    results =await Chefs.all(req.body)
    const chefs = results.rows
        return res.render("foodfy/chefs",{chefs})

    },
    
async abrirReceita(req, res) {
    let results = await Recipes.find(req.params.id)
    const recipes = results.rows[0]
        if(!recipes) return res.send("Receita não encontrada")
        return res.render(`foodfy/receita`,{recipes})

    },

async searchRecipes(req,res){
   const {filter} = req.query

   if(filter){
    let results = await Recipes.findBy(filter)
    const recipes = results.rows
        return res.render(`foodfy/searchRecipes`,{recipes,filter})

   }else{
    let results = await Recipes.all(req.body)
    const recipes = results.rows
            return res.render("foodfy/searchRecipes",{recipes})
        }
    }
}