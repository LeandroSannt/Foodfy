var {age, date} =require("../lib/configs/utils")
var Chefs =require("../models/chefsModel")
var Recipes =require("../models/recipesModel")

var RecipeFiles =require("../models/recipeFiles")
var Files =require("../models/file")

module.exports={
    
async index(req,res){
        results =await Chefs.all(req.body)
        const chefs = results.rows

        if (!chefs) return res.send("receitas não encontradas")

        async function getImage(ChefId){
            let results = await Recipes.files(ChefId)
            const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`)
            return files[0]
        }
            return res.render("admin/chefs/index",{chefs})    
    },

create(req,res){
        return res.render("admin/chefs/create")
    },
    
async post(req,res){
            const keys = Object.keys(req.body)
            for (key of keys) {
                if (req.body[key] == "") 
                    return res.send("Dados Faltando")
                }

                let results = await Chefs.create(req.body)
                const chefId = results.rows[0].id
                    return res.redirect(`/admin/chefs/details/${chefId}`)
    },
    
async details(req,res){ 

    let results = await Chefs.find(req.params.id)
        const chefs = results.rows[0]
        if(!chefs) return res.send("chef não encontrado")
        chefs.created_at = date(chefs.created_at).format

        results = await Chefs.findRecipes(req.params.id)
        const recipes =results.rows

        // // async function getImage(RecipeId){
        // //     let results = await Recipes.files(RecipeId)
        // //     const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`)
        // //     return files[0]
        // // }
        
        // // const recipesPromise = recipes.map(async recipe=>{
        // //     recipe.img = await getImage(recipe.id)

        //     return recipe
        // })

        ///const lastAdded = await Promise.all(recipesPromise)  

        async function getImage(RecipeId){
            let results = await Recipes.files(RecipeId)
            const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`)
            return files[0]
        }
        
        const recipesPromise = recipes.map(async recipe=>{
            recipe.img = await getImage(recipe.id)
    
            return recipe
        })
    
        const lastAdded = await Promise.all(recipesPromise)

            return res.render("admin/chefs/details",{recipes:lastAdded,chefs})    
    },

async edit(req,res){
        let results = await Chefs.find(req.params.id)
        const chefs = results.rows[0]
            if(!chefs) return res.send("chef não encontrado")
                return res.render("admin/chefs/edit",{chefs})    
    },

async put(req,res){
    const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == "") 
            return res.send("Dados Faltando")
        }
        await Chefs.update(req.body)
            return res.redirect(`/admin/chefs`)  

    },
    
async delete(req,res){
    await Chefs.delete(req.body.id)
            return res.redirect ("/admin/chefs")  
    }
}


        
